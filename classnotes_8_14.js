// organizing code
	//MVC
	// Controller - our event handler = callback to our event listener fxn call
		// we can map that directly to our Rails Controllers
		// (prevent default)
		// grab some user input
		// create/update model/class do a network request
		// render/display the update
	// Models
		// our JavaScript classes 
		// models tell you the ways that you can render things
	// Views
		// attached to the models
		// innerHTML

// organizing code
  // For display: want a 
  	// page title, h1
  	// list form, when I add a new list: 
  	  // form for list
  		// display a task form --> input (list-title)
  		// button[type="submit"] (list-submit)
	  		// display a newly created list
  			// new list == another div
  	// think of these as distinct pieces of hte page and we can 
  	// create models based on these pieces of the page
  		// task form
  		   // selection options [task-list]
  		   // inpt (task-description)
  		   // input (task-priority)
  		   // button [type="submit"] (task create) [event]
  		   			// create new task with those properties
  			// takes an associated list
  			// takes a priority level
  			// on submit, add this task to the associated list
  	// List of Lists
  		//ul (lists)
  		//li (list)
  			//li (task)

	  		// lists grouped on the page under 1 element
	  		// show each list
  	// List
  		// show title
  		// be able to delete it
  		// be able to delete a task

// event delegation - attach an event listener to a part of the page that already exists
// instead of on hte thing we're inserting into the page, so that we an see 



document.addEventListener('DOMContentLoaded', function() {

	let formEl = document.getElementById("add-form")
	formEl.addEventListener('submit', function(event) {
		event.preventDefault()

		let listName = document.getElementById("add-list")
		new List(listName.value)

		const taskFormTemplate = new TaskFOrm().render()
		const taskForm = document.getElementById(`task-form`)
		taskForm.innerHTML = taskFormTemplate

		const allLists = List.renderAll()
		const parentEl = document.getElementById('all-lists')
		allLists.innerHTML = 
		//Insert this into the DOM

	

		})	

	})


const List = (function createList(){
	const all = []
	let counter = 0
	
	return class List {
		constructor(name, tasks = []) {
			this.name = name
			this.id = (counter += 1)
			all.push(this)
			this.tasks = tasks
			this.tasks.forEach(task => task.list = this)
		}

		render() {
			return `
			<div>
				<h4>${this.name}</h4>
			</div>
			`
		}

		static all() {
			return all
		}

		static renderAll(){
			const allListsHTML = this.all().map(list => list.render()).join('')
			return `
			<div>
				<h4> ${allListsHTML} </h4>
			</div>
			`
		}
	}
})()

// task class - create instances
// render a list of tasks
// 


const Task = (function createTaskClass () {
	const all = []
	let counter = 0
	return class Task {
		constructor(description, priority, listId) {
			this.description = description
			this.priority = priority
			this.listId = list 
			this.id = (counter += 1)
			all.push(this)
			// this.list.tasks.push(this)
		}

	render(){
		return `
		<div>
		`
	}
	}
})()

// view-based class, no need to store data - managing how to render an 
// element or group of elements on the page

class TaskForm {
	render(){
		const lists = List.all().map(list=> `<option value=${list.id}<${list.name} </option>`).join('')
		return `
		<form id="add-task">
			<select id="task-lists">${lists}</selecct>
			<input id="task-title" type="text">
			<input id="task-priotity" type="text">
			<button type="submit value>"
		</form>
		`
		//inside of form submit event handler we grab these 3 pieces of data
		//event is listening for the form to submit, event listening for prevent default so that deosn't happen
		// then it grabs the things
	}
}












