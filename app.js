//listen for an event when the page is finished loading
document.addEventListener('DOMContentLoaded', function() {

	let formEl = document.getElementById("add-form")
	let listName = document.getElementById("add-list")
	const allListParentEl = document.getElementById('all-lists')
	const formEl2 = document.getElementById("add-task-form")
	const taskList = document.getElementById("select-list"); //dropdown form
	const options = document.getElementById('all-lists')


	formEl.addEventListener('submit', function(event) {
		event.preventDefault()

		let listnew = new List(listName.value)
		console.log(listnew)

		const allListsHTML = List.renderAll()
		allListParentEl.addEventListener('change', function(event){
			console.log('form changed')
		})
		//can call parentEl container or allLists
		const taskForm = List.renderForm()
		allListParentEl.innerHTML = allListsHTML + taskForm
		//Insert this into the DOM

//FIX BELOW

		// formEl2.addEventListener('submit', function(event) {
		// 	

		})

		allListParentEl.addEventListener('submit', event => {
			event.preventDefault()

			let taskName = document.getElementById("add-task-name")
			let taskDescription = document.getElementById("add-task-description")
			let taskPriority = document.getElementById("add-task-priority")
			let taskListID = parseInt(document.getElementById("select-list").value)
			let taskList = List.all().find(list => list.id === taskListID)
			
			// debugger

			let task = new Task(taskName.value, taskDescription.value, taskPriority.value, taskList)
			//show task
			console.log(task)

			const allListsHTML = List.renderAll() 
			const taskForm = List.renderForm()
			allListParentEl.innerHTML = allListsHTML + taskForm
		})
		//delete a list
		let container = document.getElementById('container')
		container.addEventListener( 'click',function(event) { //do not need to prevent default bc clicks do not trigger page reload
			if (event.target.classList.value.includes('delete-list') ) {
				List.deleteList(event.target.dataset.listid) //delete the list

				const allListsHTML = List.renderAll() // re-render the page without that list
				const taskForm = List.renderForm()
				allListParentEl.innerHTML = allListsHTML + taskForm
			}
		} )
		//delete a task
		let container = document.getElementById('container')
		container.addEventListener( 'click',function(event) { 
			if (event.target.classList.value.includes('delete-task') ) {
				let taskList = List.all().find(list => list.id === taskListID)
				taskList.deleteTask(event.target.dataset.taskid) //delete the task
				
				const allListsHTML = List.renderAll() // re-render the page without that task
				const taskForm = List.renderForm()
				allListParentEl.innerHTML = allListsHTML + taskForm
			}
		})
		

})


const List = (function createList(){
	let all = []
	let counter = 0
	
	return class List {
		constructor(name, tasks = []) {
			this.name = name
			this.id = (counter += 1)
			all.push(this)
			this.tasks = tasks

		}

		render() {
			let tasks = this.tasks.map(task => task.render()).join('')
			return `
			<div>
				<h4>${this.name}</h4>
				<form>
				  <input data-listid="${this.id}" class="delete-list" type="button" value="Remove List"/>
				</form>
				<ul>
					${tasks}
				</ul>
			</div>
			`
		}

		deleteTask(taskId){
			this.tasks.filter( task => task.id !== parseInt(taskId) )
		}
		
		static deleteList(listId) {
			all = List.all().filter( list => list.id !== parseInt(listId) )
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

		static renderForm(){
			 var lists = List.all

			 return `   
			     <form id="add-task-form">
					<label for="add-task"> Add a Task </label><br>
					<label for="add-task-name"> Name </label>
					<input type="text" id="add-task-name" name="name"><br>
					<label for="add-task-description"> Description </label>
					<input type="text" id="add-task-description" name="Description"><br>
					<label for="add-task-priority"> Priority </label>
					<input type="text" id="add-task-priority" name="priority"><br>
					
					<select id="select-list" form="tasklist-form">
					${this.createOptions()}
					<select name="select list">

				<input type ="submit" value="add (+)">
				</form><br>
				`
			}

		static createOptions(){
			return (this.all().map((element, index)=>{
				return `<option id=${element.id} value=${element.id}>${element.name}</option>`
			})).join("\n")

		}

	}
})()

// task class - create instances
// render a list of tasks
// 


const Task = (function () {
	let all = []
	let counter = 0
	return class Task {
		constructor(name, description, priority, list) {
			this.list = list 
			this.name = name
			this.description = description
			this.priority = priority
			this.id = (counter += 1)
			all.push(this)
			this.list.tasks.push(this)
		}

		render() {
			return `
				<li>${this.name}, ${this.description}, ${this.priority}</li>
				<form>
				  <input data-listid="${this.id}" class="delete-task" type="button" value="Remove Task"/>
				</form>
			`
		}
		
		static all() {
			return all
		}

		static renderAll(){
			const allTasksHTML = this.all().map(task => task.render()).join('')
			return `
			<div>
				<p> ${allTasksHTML} </p>
			</div>
			`
		}

	}
})()

// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }


//   }
// }

// })

//wrap in fxn
//private class variable all = []









