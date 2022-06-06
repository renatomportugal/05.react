//1.create functions (to manipulate the state the way you want) with default empty state value (eg: state=[])
var todo = (state = [], action) => {
	let newState = Object.assign([], state);
	if (action.type === "add") {
		newState.push(action.payload);
		console.log({ newState });
	}
	if (action.type === "remove") {
		newState = newState.filter(
			element => element.id !== parseFloat(action.payload)
		);
	}
	return newState;
};
// ***** this is an extra state object ******
// though we are not using this | this was not intended to be implmented
// but its great to mention when you console.log state.getStore()
//you can see how redux make account for this reducer in the global state object!
var note = (state = [], action) => {
	let newState = Object.assign([], state);
	if (action.type === "addNote") {
		newState.push(action.payload);
		console.log({ newState });
	}
	if (action.type === "removeNote") {
		newState = newState.filter(
			element => element.id !== parseFloat(action.payload)
		);
	}
	return newState;
};

//2. reducer combine all different state sub-objects into one gloabal state object
const reducer = Redux.combineReducers({
	todo,
	note
});

//3. we can now tell redux we are ready to use your Store, so lets create a store after we set up our reducers
const store = Redux.createStore(reducer);

//this is nothing specific to redux just vanila javascript instead of react
var render = () => {
	const container = document.querySelector("#container");
	container.innerHTML = "";
	const state = store.getState();
	const todos = state.todo;
	const notes = state.note;
	todos.forEach(todo => {
		container.innerHTML += `
		<div class="item" data-key="${todo.id}"> 
			<span>${todo.value}</span>
        	<button class="delete-todo">✖︎</button>
        </div>`;
	});
};
//DOM selectors
document.querySelector("#submit-todo").addEventListener("click", addBtn);
// we are using 'body.addEeventListener' instead of 'querySelector' to trigger the 'event delegation'
document.body.addEventListener("click", removeBtn);

// cool stuff
let todoContainer = "";
let maxLength = 20;

document.querySelector("#todo").addEventListener("keydown", fff);
function fff(e) {
	let todoInput = document.querySelector("#todo");
	//A = 65
	//Z = 90
	//a = 97
	//z = 122
	const keyCode = e.keyCode;
	if (
		(keyCode > 64 && keyCode < 91) ||
		(keyCode > 96 && keyCode < 123) ||
		keyCode === 32
	) {
		let letter = String.fromCharCode(keyCode).toLowerCase();
		todoContainer += letter;
		todoInput.value = todoContainer;
	} else if (keyCode === 8 && todoContainer.length > 0) {
		todoContainer = todoContainer.substring(0, todoContainer.length - 1);
		todoInput.value = todoContainer;
	}

	if (keyCode === 13) {
		if (maxLength < todoContainer.length) {
			showWarning("can not add more than 20 charaters");
		} else {
			addBtn(e);
		}
	}

	if (todoContainer.length > 9) {
		toggleLetters(todoContainer.length);
	} else if (todoContainer.length < 9) {
		toggleLetters("", true);
	}

	e.preventDefault();
}
// enf of cool stuff

// cool stuff for removing
let targetTodoToRemove;
let isNotified = false;

document.body.addEventListener("keypress", e => {
	if (isNotified) {
		if (e.key === "y" || e.key === "Y") {
			const todoObj = store
				.getState()
				.todo.filter(t => t.id == targetTodoToRemove);
			deleteTodo(targetTodoToRemove);
			isNotified = false;
			targetTodoToRemove = "";
			showWarning(`${todoObj[0].value} was deleted`);
		} else {
			isNotified = false;
			//showWarning("canceling ...");
			//or :
			const dialog = document.getElementsByClassName("info");
			dialog[0].classList.remove("show");
			dialog[0].style.top = "-50rem";
		}
	}
	document.body.classList.remove("stop-scrolling");
});

function removeBtn(e) {
	//4.dispatchers just a function returns a sufficent information(object with two values) to our reducers, any extra information you may need to pass just make your payload an object
	//our dispatcher has the absolute two minimum values here
	if (e.target.className === "delete-todo") {
		showWarning("are you sure to delete ? <br> [Y/N] ", true);
		//data set is for 'data-key' at line 51
		document.body.classList.add("stop-scrolling");
		targetTodoToRemove = e.target.parentElement.dataset.key;
		isNotified = true;
	}
	e.preventDefault();
}
//end of cool stuff for removing

function deleteTodo(id) {
	store.dispatch({
		type: "remove",
		payload: id
	});
	render();
}

function addBtn(e) {
	//5. now in our dispatcher function we pass an extra value, u gussed it ! we need an id which we are generating randomly to keep track of each todo item
	document.querySelector("#todo").value = "";
	toggleLetters(todoContainer.length, true);
	if (todoContainer !== "" && todoContainer !== " ") {
		store.dispatch({
			type: "add",
			payload: { id: Math.random(), value: todoContainer }
		});
		document.querySelector("#todo").value = "";
		// because vanilla javascript is stupid (not like react which is smart) we need to call the render method over and over
		render();
	} else {
		showWarning("please fill in the input");
	}
	todoContainer = "";
}

function showWarning(msg, confirm = false) {
	const dialog = document.getElementsByClassName("info");
	const warningText = document.querySelector(".warning-text");
	const top = window.pageYOffset;
	warningText.innerHTML = msg;
	// warningText.style.color = "red";
	// dialog[0].classList.add("show");
	dialog[0].style.top = `${top + 50}px`;
	if (!confirm) {
		setTimeout(() => {
			// dialog[0].classList.remove("show");
			dialog[0].style.top = `-10rem`;
		}, 1200);
	}
}

function toggleLetters(length, hide = false) {
	const tip = document.querySelector(".tip");
	if (hide) {
		tip.classList.remove("red");
		tip.classList.remove("show");
		return;
	}
	let calculateChars = maxLength - length;
	const msg = `you have ${calculateChars > 0 ? calculateChars : ""} ${
		calculateChars < 2
			? calculateChars == 1
				? "one character"
				: "no characters"
			: "characters"
	} left`;

	if (length == 17) {
		tip.classList.add("red");
	} else {
		tip.classList.remove("show");
	}
	tip.innerHTML = msg;
	tip.classList.add("show");
}