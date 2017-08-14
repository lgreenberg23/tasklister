//listen for an event when the page is finished loading
document.addEventListener('DOMContentLoaded', function() {
	let formEl = document.getElementById("add-form")
	formEl.addEventListener('submit', function(event) {
		event.preventDefault()

		let listName = document.getElementById("add-list")
		let listnew = new List(listName.value)
		console.log(listnew)

		const allListsHTML = List.renderAll()
		const parentEl = document.getElementById('all-lists')
		parentEl.addEventListener('change', function(event){
			console.log('form changed')
		})
		//can call parentEl container or allLists
		const taskForm = List.renderForm()
		parentEl.innerHTML = allListsHTML + taskForm
		//Insert this into the DOM

		let formEl2 = document.getElementById("add-task-form")
		formEl2.addEventListener('submit', function(event) {
			event.preventDefault()

			let taskName = document.getElementById("add-task-name")
			let taskDescription = document.getElementById("add-task-description")
			let taskPriority = document.getElementById("add-task-priority")
			const taskList = document.getElementById("select-list"); //dropdown form
			const allListsHTML = List.renderAll() 
			const options = document.getElementById('all-lists')
			// let taskList = List.all().forEach(list => list.name === )

			let task = new Task(taskName.value, taskDescription.value, taskPriority.value, taskList.value)
			//show task
			console.log(task)

			const taskForm = List.renderForm()
			parentEl.innerHTML = allListsHTML + taskForm
			})

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
			let tasks = this.tasks.map(task=> task.render()).join('')
			return `
			<div>
				<h4>${this.name}</h4>
				<ul>
					${tasks}
				</ul>
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
	const all = []
	let counter = 0
	return class Task {
		constructor(name, description, priority, list) {
			this.list = list 
			this.name = name
			this.description = description
			this.priority = priority
			this.id = (counter += 1)
			all.push(this)
			// this.list.tasks.push(this)
		}

		render() {
			return `
				<li>${this.name}</li>
			`
		}
		
		static all() {
			return all
		}

		static renderAll(){
			const allTasksHTML = this.all().map(task => task.render()).join('')
			return `
			<div>
				<h4> ${allTasksHTML} </h4>
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









