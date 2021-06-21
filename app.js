let form = document.querySelector('form');
let input = document.querySelector('input');
let ul = document.querySelector('ul');
let savedList = [];

if (localStorage.getItem('containSavedList')) {
	console.log('there is a saved list');
}

form.addEventListener('submit', function(e) {
	e.preventDefault();
	if (input.value !== '') {
		let newLi = document.createElement('li');
		let deleteBtn = document.createElement('button');
		deleteBtn.innerText = 'x';
		newLi.innerText = input.value;
		newLi.append(deleteBtn);
		savedList.push(newLi);
		input.value = '';
		displayContent(savedList);
		localStorage.setItem('containSavedList', true);
		localStorage.setItem('savedList', JSON.stringify(savedList));
	}
});

ul.addEventListener('click', function(e) {
	if (e.target.tagName === 'LI') {
		e.target.classList.toggle('completed');
	}
	if (e.target.tagName === 'BUTTON') {
		deleteContent(savedList, e);
		e.target.parentElement.remove();
		if (savedList.length === 0) {
			localStorage.removeItem('containSavedList');
		}
	}
});

function displayContent(list) {
	for (let li of list) {
		ul.append(li);
	}
}

function deleteContent(list, e) {
	let index = list.indexOf(e.target.parentElement);
	list.splice(index, 1);
}
