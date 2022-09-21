let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let  textarea= document.getElementById("textarea");
let  tasks= document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit" , (e)=> {
    e.preventDefault();
    formValidation();
});


let formValidation = ()=> {
    if(textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
      }
    else{
          console.log("success");
          msg.innerHTML = "";
          acceptData();
          add.setAttribute("data-bs-dismiss" , "modal");
          add.click();


   // IIFE 

   (()=>{
    add.setAttribute("data-bs-dismiss" , "");
   })();


    }
}; 
 let data =[{}];

 let acceptData =()=>{
    data.push({
    text: textInput.value,
    date:dateInput.value,
    Description: textarea.value,

    });

    localStorage.setItem("data",JSON.stringify( data));
    console.log(data);
    createTasks();
 };
 
//let data = {};


//let acceptData = () => {
  //  data["text"] = textInput.value;
    //data["date"] = dateInput.value;
    //data["Description"] = textarea.value;
    
  //  createTasks();
//};
// x will target for example all 5 obj one by one 
// y is serial number start from 0 
let createTasks =()=> {
    tasks.innerHTML="";
 data.map((x,y) =>{
    return (tasks.innerHTML += `

    <div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.Description}</p>
               <span class="options">
                <i onClick="editTasks(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick="deleteTasks(this);createTasks()" class="fas fa-trash-alt"></i>
               </span>
            </div>
   
    `);
 });

//  tasks.innerHTML += `

//  <div>
//              <span class="fw-bold">${data.text}</span>
//              <span class="small text-secondary">${data.date}</span>
//              <p>${data.Description}</p>
//             <span class="options">
//              <i onClick="editTasks(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
//              <i onClick="deleteTasks(this)" class="fas fa-trash-alt"></i>
//             </span>
//          </div>

//  `;

   resetForm();
};


let deleteTasks =(e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id , 1);
    localStorage.setItem("data",JSON.stringify( data));

    console.log(data);
}
let editTasks =(e) => {
    let selectedTasks =e.parentElement.parentElement;
   
    textInput.value= selectedTasks.children[0].innerHTML;
    dateInput.value=selectedTasks.children[1].innerHTML;
    textarea.value=selectedTasks.children[2].innerHTML;
     
    deleteTasks(e);
};


let resetForm =()=> {
    textInput.value="";
    dateInput.value="";
    textarea.value="";


};

(()=>{
    data=JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();