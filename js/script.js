const mainBody = document.querySelector('.todo-main-body');
const emptyState = document.querySelector('.empty-state');

const textInput = document.getElementById('textinput');
const form = document.querySelector('form');
const priorityShow = document.querySelector('.priority-container');
const priorityList = document.querySelectorAll('.priority-btn');
const filterItem = document.querySelector('.filter-item');
const filterInput = document.getElementById('filter-items')

let selectedPriority = null;

const highItemList = document.getElementById('high-items-list');
const mediumItemList = document.getElementById('medium-items-list');
const lowItemList = document.getElementById('low-items-list');

//Button
const highTagBtn = document.querySelector('.high-tag');
const mediumTagBtn = document.querySelector('.medium-tag');
const lowTagBtn = document.querySelector('.low-tag');

//Badge
const highBadge = document.querySelector('.badge-high');
const mediumBadge = document.querySelector('.badge-medium');
const lowBadge = document.querySelector('.badge-low');


const checkbox = document.querySelector('.checkbox');




//Making input has has item before the priority list shows
textInput.addEventListener('input', (e) => {

    if(textInput.value.length > 0){
         priorityShow.style.display = 'flex';


    }else{
        priorityShow.style.display = 'none';
        prioritylist();
    }
   
});




prioritylist();


function prioritylist() {


priorityList.forEach(selectList => {

    console.log(selectList)



     selectList.classList.remove('high');
      selectList.classList.remove('medium');
       selectList.classList.remove('low');

    selectList.addEventListener('click', (e) => {
       const prioritySingleList  = e.target;

       // remove active classes from ALL buttons
        priorityList.forEach(btn => {
            btn.classList.remove('high','medium','low');
        });

       if(prioritySingleList.classList.contains('1')){
           prioritySingleList.classList.add('high');
       } else if (prioritySingleList.classList.contains('2')) {
             prioritySingleList.classList.add('medium');
       } else if (prioritySingleList.classList.contains('3')) {
             prioritySingleList.classList.add('low');
       }

       //Add this to the global variable
       selectedPriority = prioritySingleList.innerText ;


    
});

});



}






//Add Item

function addItem(e){

      e.preventDefault();
      

    if( textInput.value.length < 1 || selectedPriority == null){
        alert('Make sure you fill the form and select priority')
    } else {


        //Get the localStorage//
        const getLsItems = JSON.parse(localStorage.getItem('lsitems')) || [];

        //  // Generate next ID
        const nextId = getLsItems.length > 0 ? Math.max(...getLsItems.map(itemList => itemList.id)) + 1
                                              :  1;
        

        // Start creating the Li
        const li = document.createElement('li');
        li.setAttribute('data-id', nextId);
        li.className = 'item ' + selectedPriority;
    
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        li.appendChild(checkbox);
         li.appendChild(document.createTextNode(textInput.value));

         const removeBtn = document.createElement('div');
         removeBtn.className = 'removeIcon';
         
         const removeImg = document.createElement('img');
         removeImg.src = 'img/close-circle.svg';
         removeImg.className = 'removeimg';

         removeBtn.appendChild(removeImg);

        // removeBtn.innerHTML = '  <img src="img/close-circle.svg" class="removeimg"> ';

        li.appendChild(removeBtn);

        if(selectedPriority === 'High'){
              //Append Li to Ul
             highItemList.appendChild(li);
        }else if (selectedPriority === 'Medium') {
              mediumItemList.appendChild(li);
        }else if (selectedPriority === 'Low') {
              lowItemList.appendChild(li);
        }


                                          
        // Create object
        const inputPriorityItem = {
            id: nextId,
            item:  textInput.value,
            priority: selectedPriority
        }

        //Add to LocalHost 

        addToLocalStorage(inputPriorityItem);


        //Reset input field & Select back to default;
        textInput.value = '';
        textInput.value.length = 0;
        selectedPriority = null;
        

        checkUI();

        // console.log(textInput.value);
        // console.log(selectedPriority);

    }
}

//------------------------------------------------------------------------
 //Add to localStorage

 function addToLocalStorage(item){
    let itemFromStorage;
    //First Check if lsitem exist on the localStorage
    if(localStorage.getItem('lsitems') === null){
        itemFromStorage = [];
    }else{
           //convert to string to Array for the enablement to push other array set
        itemFromStorage = JSON.parse(localStorage.getItem('lsitems'));
    }

    itemFromStorage.push(item);

    //Convert to JSON String and set to local Storage
    localStorage.setItem('lsitems', JSON.stringify(itemFromStorage));
 }


 //-----------------------------------------------------------------------


 // --- GET item from LS

    function getItemFromLs(){
         let itemFromStorage;
        //First Check if lsitem exist on the localStorage
        if(localStorage.getItem('lsitems') === null){
            itemFromStorage = [];
        }else{
            //convert to string to Array for the enablement to push other array set
            itemFromStorage = JSON.parse(localStorage.getItem('lsitems'));
        }

        return itemFromStorage;
    }

 //

// Display item from LocalStorage ---------------------------------------

 function displayItem(){

        const itemFromStorage = getItemFromLs();

        // console.log(itemFromStorage)

        itemFromStorage.forEach(items => {

            const li = document.createElement('li');
            li.setAttribute('data-id', items.id);
            li.className = 'item ' + items.priority;
        
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';

            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(items.item));

            // console.log(items.priority)

            const removeBtn = document.createElement('div');
            removeBtn.className = 'removeIcon';
            
            const removeImg = document.createElement('img');
            removeImg.src = 'img/close-circle.svg';
            removeImg.className = 'removeimg';

            removeBtn.appendChild(removeImg);

            // removeBtn.innerHTML = '  <img src="img/close-circle.svg" class="removeimg"> ';

            li.appendChild(removeBtn);

            if(items.priority === 'High'){
                //Append Li to Ul
                highItemList.appendChild(li);
            }else if (items.priority === 'Medium') {
                mediumItemList.appendChild(li);
            }else if (items.priority === 'Low') {
                lowItemList.appendChild(li);
            }

        });

       checkUI();


 }

//-----------------------------------------------------------------------



function checkUI(){

    const checkHighList = highItemList.querySelectorAll('li');
     const mediumList = mediumItemList.querySelectorAll('li');
     const lowList = lowItemList.querySelectorAll('li');

   


     //GlobalCheck to add empty State
     if(checkHighList.length === 0 && mediumList.length === 0 && lowList.length === 0 ){
        emptyState.style.display = 'block';
        filterItem.style.display = 'none';
     }else{
         emptyState.style.display = 'none';
          filterItem.style.display = 'block';
     }

    
    //ShowEach Priority Tag and update the badge as item is been added or removed
    if(checkHighList.length > 0 ){
        highTagBtn.style.display = 'block';
        highBadge.innerText = checkHighList.length;

    }else{
          highTagBtn.style.display = 'none';
    }

     if(mediumList.length > 0 ){
        mediumTagBtn.style.display = 'block';
        mediumBadge.innerText = mediumList.length;
        
    }else{
          mediumTagBtn.style.display = 'none';
    }

     if(lowList.length > 0 ){
        lowTagBtn.style.display = 'block';
         lowBadge.innerText = lowList.length;
        
    }else{
          lowTagBtn.style.display = 'none';
    }


    // Making sure if the filter value length is still above 0 the tag button show not show
    
    if( filterInput.value.length > 0){
            highTagBtn.style.display = 'none';
            mediumTagBtn.style.display = 'none';
            lowTagBtn.style.display = 'none';
        
    }



    // Resetting the input filed

    if(textInput.value.length > 0){
         priorityShow.style.display = 'flex';
    } else{
        priorityShow.style.display = 'none';
        //
            priorityList.forEach(selectList => {
                 selectList.classList.remove('high');
                 selectList.classList.remove('medium');
                 selectList.classList.remove('low');
            });
    }
}



//Filter

function filterItemFunc(e){

               
        const filterValue = e.target.value.toLowerCase();;
        const allItems = mainBody.querySelectorAll('li');
        const emptyFilterState = document.querySelector('.noresult');

       
        //trackWhenFilterMatches
        let trackfilter = false;

        allItems.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if(itemText.includes(filterValue)){
                item.style.display = 'block';
                trackfilter = true;
                //Removing All the priority-tag on the filter
                 highTagBtn.style.display = 'none';
                 mediumTagBtn.style.display = 'none';
                 lowTagBtn.style.display = 'none';
            }else{
                item.style.display = 'none';
                //Removing All the priority-tag on the filter
                 highTagBtn.style.display = 'none';
                 mediumTagBtn.style.display = 'none';
                 lowTagBtn.style.display = 'none';
            }
        });


        //afterloop finishes
        console.log(trackfilter)
        if(trackfilter){
            emptyFilterState.style.display = 'none';
            
             highTagBtn.style.display = 'none';
                 mediumTagBtn.style.display = 'none';
                 lowTagBtn.style.display = 'none';

        }else{
            emptyFilterState.style.display = 'block';
                highTagBtn.style.display = 'none';
                 mediumTagBtn.style.display = 'none';
                 lowTagBtn.style.display = 'none';
        }


   

}


// RemoveItem from DOM ----------------------------------------------
function removeItem(e){
    if(e.target.classList.contains('removeimg')){
        if(confirm('Are you sure you want to remoce this item?')){
              
                // Remove from DOM first
            e.target.parentElement.parentElement.remove();
       
            //PROCESS TO REMOVE FROM LS

        //making sure you get to Li data ID before passing to to LS remove function

        const li = e.target.parentElement.parentElement;   
        let iId = li.getAttribute('data-id');

        // Remove the item after getting the ID
             removeItemFromLS(iId);


            //Check & update UI
            checkUI();

         }

    };



}

//------------------------------------------------------------------

//RemoveItem from LocalStorage 

    function removeItemFromLS(id){

        //get item from LS
        let itemFromStorage = getItemFromLs();

         itemFromStorage = itemFromStorage.filter(items => items.id !== Number(id));
        localStorage.setItem('lsitems', JSON.stringify(itemFromStorage));

    }


//------------------------------------------------------------------


// TickAsDone

function tickAsDone(e){
      if(e.target.classList.contains('checkbox')){
    const li = e.target.parentElement;

     if(e.target.checked){
            li.classList.add('strikethrough-text');
        } else{
              li.classList.remove('strikethrough-text');
        }
   }
   
}

//Initialize App
function init(){
//Event Listener
form.addEventListener('submit', addItem);
mainBody.addEventListener('click', removeItem);
mainBody.addEventListener('change', tickAsDone );
mainBody.addEventListener('change', tickAsDone );
filterInput.addEventListener('input', filterItemFunc);
addEventListener('DOMContentLoaded', displayItem);

checkUI();

}

init();

