let draggedImageItem;
const tierNameInput = document.getElementById('tier-name-input');
console.log(tierNameInput);
const createTierButton = document.getElementById('create-tier-button');
const imageForm = document.getElementById('image-form');
const existingImageItems = document.getElementsByClassName('image-item');
for(const imageItem of existingImageItems){
    enableImageItemInteractions(imageItem);
}
console.log(existingImageItems);
imageForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const imageUrlInput = document.getElementById('image-url-input');
    const imageUrl = imageUrlInput.value;
    if(imageUrlInput.value ===''){
        alert("please enter image url");
        return;
    }
    createImageItem(imageUrl);
    imageUrlInput.value = '';
})
createTierButton.addEventListener('click',(event)=>{
    event.preventDefault();
    if(tierNameInput.value===''){
        alert("please enter value");
        return;
    }
    createTier(tierNameInput.value);
    tierNameInput.value = '';
})

function createTier(tierName){
    const tierRow = document.createElement('div');
    tierRow.classList.add('tier-row');
    const heading = document.createElement('h2');
    heading.classList.add('tier-row__name');
    heading.textContent=tierName;
    const tierItems = document.createElement('div');
    tierItems.classList.add('tier-row__items');
    tierRow.appendChild(heading);
    tierRow.appendChild(tierItems);
    enableTierDropZone(tierItems);
    const tierList = document.getElementById('tier-list');
    tierList.appendChild(tierRow);
}

function createImageItem(imageUrl){
    const imageItem = document.createElement('div');
    imageItem.setAttribute('draggable','true');
    imageItem.classList.add('image-item');
    enableImageItemInteractions(imageItem);
    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('image-item__image');
    imageItem.appendChild(image);
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.appendChild(imageItem);
}

function enableImageItemInteractions(itemContainer){
    itemContainer.addEventListener('dragstart',(event)=>{
        draggedImageItem = event.target.parentNode;
    });
    itemContainer.addEventListener('dblclick',(event)=>{
        const parentNode = event.target.parentNode;
        const imageGallery = document.getElementById('image-gallery');
        imageGallery.appendChild(parentNode);
    })
}
function enableTierDropZone(tierItems){
    tierItems.addEventListener('drop',(event)=>{
        event.preventDefault();
    })
    tierItems.addEventListener('dragover',function (event){
        console.log("dragover the drop zone")
        if(this != draggedImageItem.parentNode){
            this.appendChild(draggedImageItem);
        }
    })
}