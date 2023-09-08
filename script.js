const localStorageName = 'to-do-list';

function newTask(){
    let input = document.getElementById("input-new-task");
    input.style.border = ""
    if (!input.value){
        input.style.border = "1px solid red"
        alert('Digite algo para inserir em sua lista');
    }
    else if(validateIfExistsNewTask()){
        alert("Já existe uma task com essa descrição")
    }
    else{
        let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageName, JSON.stringify(values));
        showValues();
    }
    input.value = '';
    
}

function showValues(){

    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']} <button id="btn-add" onclick='removeItem("${values[i]['name']}")'><span class="material-symbols-outlined">done</span></button></li>`
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    let index = values.find(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();

}

function validateIfExistsNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    let inputValue = document.getElementById("input-new-task").value;
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true


}


showValues();