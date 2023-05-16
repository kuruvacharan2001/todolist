(function(){
    const todoinput = document.getElementById('todoinput');
    const inputbutton =document.getElementById('inputbutton');
    let counter = document.getElementById('counter');
    const todolist = document.getElementById('todolist');
    const listitem = document.getElementById('listitem');
    let bool=true;
    let data;
    let tasks=[];
    let task;
    
    todoinput.addEventListener('keyup',function(event){
        
        data = event.target.value;
        if(data !== '' && bool){
            inputbutton.style.display="inline";
            
            bool=false;
        }
    
    })
    
    inputbutton.addEventListener('click',function(){
        task={
            id:Date.now().toString(),
            text:data,
            done:false
    
        }
        todoinput.value='';
        data='';
        bool=true;
        inputbutton.style.display="none";
        
        addTodo(task);
    })
    
    document.addEventListener('click',handleclick);
    function handleclick(event){
        
        let target = event.target;
        
        if(target.className === 'material-symbols-outlined delete'){
            let  task_id = target.getAttribute('data-id');
            
            deleteTodo(task_id);
    
        }else if(target.className === 'custom-checkbox'){
            let  task_id = target.getAttribute('id');
            
            toggleTodo(task_id);
        }
    
    }
    
    function addTodo(task){
        if(task){
            tasks.push(task);
            
            renderList();
        }else{
            show("todo is not added");
        }
    }
    function deleteTodo(taskid){
        let alist = tasks.filter(function(task){
            return task.id !== taskid;
        })
    
           
            tasks=alist;
            
            renderList();
        
        
        
        
    }
    function toggleTodo(taskid){
        let alist = tasks.filter(function(task){
            return taskid === task.id;
        })
        if(alist.length == 0){
            show('todo is not toggled');
        }else{
            alist[0].done=!alist[0].done;
          
            renderList();
        }
    }
    function renderList(){
        todolist.innerHTML='';
        let len=0;
        for(let i in tasks){
            if(tasks[i].done === false){
                len =len+1;
            }
            addtodom(tasks[i]);
        }
        counter.innerHTML=len;
    }
    function addtodom(task){
        const li = document.createElement('li');
        li.innerHTML=`
            <div>
                <input type="checkbox" id=${task.id} class='custom-checkbox' ${task.done ? 'checked' : ''}>
                <label for="${task.id}">${task.text}</label>
            </div>
        
        <button type="button"  >
        <span class="material-symbols-outlined delete" data-id='${task.id}'>
            delete
            </span>
        </button>
        `;
        todolist.append(li);
    
    }
    function show(text){
        alert(text);
    }
})();
