// menu Item
const humburger = getId('humburger');
const menuItem = getId('menuItem');
const contactBtn = getId('contactBtn');

humburger.addEventListener('click', function(){
    menuItem.classList.toggle('hidden');
    if(contactBtn.classList.contains('hidden')){
        contactBtn.classList.remove('hidden');
        contactBtn.classList.add('flex');
    }else{
        contactBtn.classList.remove('flex');
        contactBtn.classList.add('hidden');
    }
})

// function for load Data
function loadData(api, cb) {
    fetch(api)
        .then (response => response.json())
        .then (data => cb(data.categories))
}
// category Items Show
function categoryItemsShow(getData) {
    const categoryItem = getId('categoryItem');
    for(let category of getData) {
        categoryItem.innerHTML += `<button type="button" class="category-item flex justify-center gap-2 items-center border border-stone-200 p-2 rounded-md hover:bg-stone-100 cursor-pointer" id="${category.category}">
                <img src="${category.category_icon}" class="w-7 lg:w-14" alt="dog image">
                <h6 class="font-bold text-base md:text-xl lg:text-2xl">${category.category}</h6>
        </button>`;
    }
}




// Load Data From Dom 
loadData(`https://openapi.programming-hero.com/api/peddy/categories`, categoryItemsShow);

