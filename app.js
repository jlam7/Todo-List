let form = document.querySelector('form');
let input = document.querySelector('input');
let ul = document.querySelector('ul');
let savedList = [];

if (localStorage.getItem('savedList')) {
	let parseList = JSON.parse(localStorage.getItem('savedList'));
	parseList.map(function(li) {
		savedList.push(li);
		displayContent(li);
	});
}

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value !== '') {
		let todoItem = { value: '', completed: false };
		todoItem.value = input.value;
		input.value = '';
		savedList.push(todoItem);

		displayContent(todoItem);
		localStorage.setItem('savedList', JSON.stringify(savedList));
	}
});

ul.addEventListener('click', function(e) {
	if (e.target.tagName === 'SPAN') {
		e.target.classList.toggle('completed');
		updateContent(savedList, e);
		localStorage.setItem('savedList', JSON.stringify(savedList));
	}
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
		deleteContent(savedList, e);
		localStorage.setItem('savedList', JSON.stringify(savedList));
	}
});

function displayContent(todo) {
	let span = document.createElement('span');
	let newLi = document.createElement('li');
	let removeBtn = document.createElement('button');
	if (todo.completed === true) {
		span.classList.add('completed');
	}
	span.innerText = todo.value;
	removeBtn.innerText = 'x';
	newLi.append(span, removeBtn);
	ul.append(newLi);
}

function updateContent(list, e) {
	let searchText = e.target.innerText;
	for (let i = 0; i < list.length; i++) {
		if (list[i].value === searchText) {
			let opposite = !list[i].completed;
			list[i].completed = opposite;
		}
	}
}

function deleteContent(list, e) {
	let searchText = e.target.previousElementSibling.innerText;
	for (let i = 0; i < list.length; i++) {
		if (list[i].value === searchText) {
			list.splice(i, 1);
		}
	}
}
