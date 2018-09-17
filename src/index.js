
var todos;
window.addEventListener("load", () => {
    todos = new Todos();
    todos.addEventListener();
});


class Todos{
  constructor(){
    this. todoList=JSON.parse(localStorage.getItem('TODOS'));
    if(!this.todoList){
      this.todoList=new Array();
    }
    this.filter="ALL";
    this.render_saveList()
  }

  addEventListener()
  {

    //press Enters or loses focus
    let input=document.getElementById("input");
    input.setAttribute("onblur", "todos.addTodo();");
    input.addEventListener("keyup", (event) =>{
      if (event.keyCode === 13) {
        this.addTodo();
      }
    });

    //filter All
    
    let all=document.getElementById("all");
    all.onclick=()=>{
      this.filter="ALL";
      this.render_saveList();
    }

    //filter Active
    
    let active=document.getElementById("active");
    active.onclick=()=>{
      this.filter="ACTIVE";
      this.render_saveList();
    }

    //filter Completed
    
    let completed=document.getElementById("completed");
    completed.onclick=()=>{
      this.filter="COMPLETED";
      this.render_saveList();
    }
  }

  addTodo(){
    let input=document.getElementById("input");
    if(input.value!='')
    {
      let todo={
        task:input.value,
        isCompleted:false,
      };
      input.value='';
      this.todoList.push(todo);

      this.render_saveList();
    }
  }

  removeTodo(index){
    this.todoList.splice(index, 1);
    this.render_saveList();
  }

  changeCompleted(index){
    this.todoList[index].isCompleted=(!this.todoList[index].isCompleted);
    this.render_saveList();
  }

  changeTodo(index){
    let todo=document.getElementById("todo"+index);

    //clear child
    todo.innerHTML='';

    let input=document.createElement("input");
    todo.appendChild(input);
    input.focus();
    input.value=this.todoList[index].task;
    input.className="reInput";
    input.setAttribute("id", "change"+index);
    input.setAttribute("onblur", "todos.CompletedChangeTodo("+index+");");
    input.addEventListener("keyup", (event) =>{
      if (event.keyCode === 13) {
        this.CompletedChangeTodo(index);
      }
    });
  }

  CompletedChangeTodo(index){
    let input=document.getElementById("change"+index);
    this.todoList[index].task=input.value;
    this.render_saveList();
  }

  render_saveList(){
    
    //save list
    localStorage.setItem("TODOS", JSON.stringify(this.todoList));

    //clear old list
    let list=document.getElementById("todos");
    while( list.firstChild ){
      list.removeChild( list.firstChild );
    }

    //render list
    switch (this.filter) {
      case "ALL":
        this.filterAll();
        break;
      case "ACTIVE":
        this.filterActive();
        break;
      case "COMPLETED":
        this.filterCompleted();
        break;
    }
  }

  filterActive(){
    let list=document.getElementById("todos");
    let count=0;
    this.todoList.forEach( (element, index)=> {

      if(!element.isCompleted){
        count++;

        let li=document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", "todo"+index);
        li.setAttribute("ondblclick", "todos.changeTodo("+index+");");
        li.onmouseover=()=>{
          button. style.visibility = 'visible';
        }
        li.onmouseout=()=>{
          button. style.visibility = 'hidden';
        }

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
        button. style.visibility = 'hidden';
        li.appendChild(button);
   
        list.appendChild(li);
      }
    });

    let label=document.getElementById("count");
    label.innerHTML=count+" items left";
  }

  filterCompleted(){
    let list=document.getElementById("todos");
    let count=this.todoList.length;
    this.todoList.forEach( (element, index)=> {
      if(element.isCompleted){
        count--;

        let li=document.createElement("li");
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", "todo"+index);
        li.setAttribute("ondblclick", "todos.changeTodo("+index+");");
        li.onmouseover=()=>{
          button. style.visibility = 'visible';
        }
        li.onmouseout=()=>{
          button. style.visibility = 'hidden';
        }

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
        button. style.visibility = 'hidden';
        li.appendChild(button);
     
        list.appendChild(li);
      }
    });

    let label=document.getElementById("count");
    label.innerHTML=count+" items left";
  }

  filterAll(){
    let list=document.getElementById("todos");
    let count=this.todoList.length;
    this.todoList.forEach( (element, index)=> {
      let li=document.createElement("li");
      li.setAttribute("class", "list-group-item")
      li.setAttribute("id", "todo"+index);
      li.setAttribute("ondblclick", "todos.changeTodo("+index+");");
      li.onmouseover=()=>{
          button. style.visibility = 'visible';
        }
        li.onmouseout=()=>{
          button. style.visibility = 'hidden';
        }

      //Checkbox completed
      let checkBox=document.createElement("input");
      checkBox.setAttribute("type", "checkBox");
      if(element.isCompleted)
      {
        count--;
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
      button. style.visibility = 'hidden';  
      li.appendChild(button);
   
      list.appendChild(li);
    });

    let label=document.getElementById("count");
    label.innerHTML=count+" items left";
  }

}


