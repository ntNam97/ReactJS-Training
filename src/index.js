
class Todos{
  constructor(){
    this. todoList=JSON.parse(localStorage.getItem('TODOS'));
    if(!this.todoList){
      this.todoList=new Array();
    }
    this.render_saveList()
  }

  addEventListener()
  {

    //press Enters
    let input=document.getElementById("input");
    input.addEventListener("keyup", (event) =>{
      if (event.keyCode === 13) {
        this.addTodo(input);
      }
    });

    //filter All
    let all=document.getElementById("all");
    all.onclick=()=>{
      this.render_saveList();
    }

    //filter Active
    let active=document.getElementById("active");
    active.onclick=()=>{
      this.filterActive();
    }

    //filter Completed
    let completed=document.getElementById("completed");
    completed.onclick=()=>{
      this.filterCompleted();
    }
  }

  addTodo(input){
    let todo={
      task:input.value,
      isCompleted:false,
    };
    this.todoList.push(todo);
    input.value='';
    this.render_saveList();
  }

  removeTodo(index){
      this.todoList.splice(index, 1);
      this.render_saveList();
  }

  changeCompleted(index){
    this.todoList[index].isCompleted=(!this.todoList[index].isCompleted);
    this.render_saveList();
  }

  filterActive(){
    console.log('active');

    //clear old list
    let list=document.getElementById("todos");
    while( list.firstChild ){
      list.removeChild( list.firstChild );
    }

    //render list
    this.todoList.forEach( (element, index)=> {

      if(!element.isCompleted){
        let li=document.createElement("li");
        li.setAttribute("class", "list-group-item")

        //Checkbox completed
        let checkBox=document.createElement("input");
        checkBox.setAttribute("type", "checkBox");
        checkBox.setAttribute("onchange", "todos.changeCompleted("+index+");");
        li.appendChild(checkBox);

        //Label task
        let label=document.createElement("label");
        label.innerHTML=element.task;
        li.appendChild(label);

        //Button delete
        let button=document.createElement("button");
        button.innerHTML='x';
        button.setAttribute("onclick", "todos.removeTodo("+index+");");
        li.appendChild(button);
   
        list.appendChild(li);
      }
    });
  }

  filterCompleted(){
     console.log('completed');

    //clear old list
    let list=document.getElementById("todos");
    while( list.firstChild ){
      list.removeChild( list.firstChild );
    }

    //render list
    this.todoList.forEach( (element, index)=> {
      if(element.isCompleted){
        let li=document.createElement("li");
        li.setAttribute("class", "list-group-item")

        //Checkbox completed
        let checkBox=document.createElement("input");
        checkBox.setAttribute("type", "checkBox");
        checkBox.setAttribute("checked","true");
        checkBox.setAttribute("onchange", "todos.changeCompleted("+index+");");
        li.appendChild(checkBox);

        //Label task
        let label=document.createElement("label");
        label.innerHTML=element.task;
        label.style.textDecoration = "line-through";
        label.style.color = "#C0C0C0";
        li.appendChild(label);

        //Button delete
        let button=document.createElement("button");
        button.innerHTML='x';
        button.setAttribute("onclick", "todos.removeTodo("+index+");");
        li.appendChild(button);
     
        list.appendChild(li);
      }

    });
  }

  render_saveList(){
    console.log(this.todoList)
    //save list
    localStorage.setItem("TODOS", JSON.stringify(this.todoList));

    //clear old list
    let list=document.getElementById("todos");
    while( list.firstChild ){
      list.removeChild( list.firstChild );
    }

    //render list
    this.todoList.forEach( (element, index)=> {
      let li=document.createElement("li");
      li.setAttribute("class", "list-group-item")

      //Checkbox completed
      let checkBox=document.createElement("input");
      checkBox.setAttribute("type", "checkBox");
      if(element.isCompleted)
      {
        checkBox.setAttribute("checked","true");
      }
      checkBox.setAttribute("onchange", "todos.changeCompleted("+index+");");
      li.appendChild(checkBox);

      //Label task
      let label=document.createElement("label");
      label.innerHTML=element.task;
      if(element.isCompleted){
        label.style.textDecoration = "line-through";
        label.style.color = "#C0C0C0";
      }
      li.appendChild(label);

      //Button delete
      let button=document.createElement("button");
      button.innerHTML='x';
      button.setAttribute("onclick", "todos.removeTodo("+index+");");
      li.appendChild(button);
   
      list.appendChild(li);
    });
  }

}

var todos;
window.addEventListener("load", () => {
    todos = new Todos();
    todos.addEventListener();
});