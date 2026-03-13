const mainBody = document.querySelector('.todo-main-body');
const emptyState = document.querySelector('.empty-state');

const textInput = document.getElementById('textinput');
const form = document.querySelector('form');
const priorityShow = document.querySelector('.priority-container');
const priorityList = document.querySelectorAll('.priority-btn');
const filterItem = document.querySelector('.filter-item');
const filterInput = document.getElementById('filter-items')


let selectedPriority = null;
let itemId = null;
let itemName = null;
let isEditMode = false;
let checkboxResult = null;

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
        //SetCheckbox defaul status to uncheck
         checkboxResult = 'unchecked';

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
            priority: selectedPriority,
            checkstatus: checkboxResult
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

     // Join all the UI so I can use them for checkbox
  const allLis = mainBody.querySelectorAll('li');


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


        // Make sure check UI update the Lis with the item check from LS

    const itemFromStorage = getItemFromLs();

            let globalCheckBoxId = [];
             lsCheckboxStatus = 'checked';

             itemFromStorage.forEach(itemList => {

                if(itemList.checkstatus === lsCheckboxStatus){
                    globalCheckBoxId.push(itemList.id);
                }
                console.log(globalCheckBoxId);
                   
            });


           allLis.forEach(li => { 

            liIds = li.getAttribute('data-id');

                if(globalCheckBoxId.includes(Number(liIds))){
                    
                    const checkbox = li.querySelector('input[type="checkbox"]');
                    checkbox.setAttribute('checked', lsCheckboxStatus);
                    checkbox.checked = true;
                     li.classList.add('strikethrough-text');

                    console.log(globalCheckBoxId)
                }

         });


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


        //Reset UI / Update UI after filter is no longer in use.
    checkUI();
   

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



};

//...........Edit Content //...................

function editItem(e){

    

     const itemFromStorage = getItemFromLs();

     //-------- THE PURPOSE FOR THIS CODE IS TO FADE THE LI COLOR THAT IS BEEN EDITTED ---

     //Get all the Lis 
    const allLis = mainBody.querySelectorAll('li');
    //--------------------------------------------------------------------------------------


    if(e.target.classList.contains('item')){



        //--- ACTUAL CODE TO FADE THE EDIT LI COLOR -----------
        allLis.forEach(Lis => {
            //Set the default color
             Lis.style.color = '#444'

             // Once it been click the active Lis choose a new color
            if(Lis.getAttribute('data-id') === e.target.getAttribute('data-id')){
                console.log(Lis);
                Lis.style.color = '#ccc'
            }
        })

        //-------------------------------------------------------------------------

       
        //EDIT FLOW CONTINUES HERE

        textInput.value = e.target.innerText;
        priorityShow.style.display = 'flex';
    

        isEditMode = true;

         itemFromStorage.forEach(itemList => {
       
        if(itemList.item === e.target.innerText ){

       
         selectedPriority = itemList.priority;
         itemId = itemList.id
       
        priorityList.forEach(selectList => {

                     selectList.classList.remove('high','medium','low');

                     if(selectedPriority === 'High' && selectList.classList.contains('1')){
                        selectList.classList.add('high');
                    }

                    if(selectedPriority === 'Medium' && selectList.classList.contains('2')){
                        selectList.classList.add('medium');
                    }

                    if(selectedPriority === 'Low' && selectList.classList.contains('3')){
                        selectList.classList.add('low');
                    }

            //Add this to the global variable
            selectedPriority = itemList.priority;

         });


         }


        });

    };
    
    
    
}

//------------------------------------------------------------------

function updateEdit(){

    // Get updated values from the input & priority selection
    let newText = textInput.value;
    const newPriority = selectedPriority;
    
    if(newText.trimStart().length > 0 ) {
        
     let itemFromStorage = getItemFromLs();

    itemFromStorage.forEach(itemList => {
        if(itemList.id === Number(itemId)){
           itemList.item = newText;        // <-- use input value
            itemList.priority = newPriority; // <-- use selectedPriority
        }
    });
    
     localStorage.setItem('lsitems', JSON.stringify(itemFromStorage));


        // setting back the edit mode to false;
      isEditMode = false;

    // Reset input field if you want
    textInput.value = '';
    selectedPriority = null;
    itemId = null;

 // Clear existing li from the displaty to lists
   clearOldLists()

    // Re-display items
    displayItem();
    checkUI();

    } else{
        alert('Enter a valid input');
    }


}

//------ CLear list After Update or it show the new editted item ---

function clearOldLists() {
    highItemList.querySelectorAll('li').forEach(li => li.remove());
    mediumItemList.querySelectorAll('li').forEach(li => li.remove());
    lowItemList.querySelectorAll('li').forEach(li => li.remove());
}

//

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

     const itemFromStorage = getItemFromLs();

      if(e.target.classList.contains('checkbox')){

         const li = e.target.parentElement;
         const liId = e.target.parentElement.getAttribute("data-id");

         console.log(typeof liId);
    // console.log(e.target.checked)

     if(e.target.checked){

        checkboxResult = 'checked';

         itemFromStorage.forEach(itemList => {
            if(itemList.id === Number(liId))
               itemList.checkstatus =  checkboxResult;
        });

            li.classList.add('strikethrough-text');
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.setAttribute('checked', checkboxResult);
            
        } else{

                  checkboxResult = 'unchecked';

                itemFromStorage.forEach(itemList => {
                    if(itemList.id === Number(liId))
                    itemList.checkstatus =  checkboxResult;
                });

              li.classList.remove('strikethrough-text');

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.removeAttribute('checked');
        }
   }
   
   localStorage.setItem('lsitems', JSON.stringify(itemFromStorage));
}

//Initialize App
function init(){
//Event Listener
form.addEventListener('submit', function (e) { 
    e.preventDefault();
    if(isEditMode){
        updateEdit();
    }else{
        addItem(e);
    }
});
mainBody.addEventListener('click', removeItem);
mainBody.addEventListener('click', editItem);
mainBody.addEventListener('change', tickAsDone );
// mainBody.addEventListener('change', tickAsDone );
filterInput.addEventListener('input', filterItemFunc);
addEventListener('DOMContentLoaded', displayItem);

checkUI();

}

init();

