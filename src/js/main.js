// menu Item
const humburger = getId('humburger');
const menuItem = getId('menuItem');
const contactBtn = getId('contactBtn');

humburger.addEventListener('click', function () {
    menuItem.classList.toggle('hidden');
    if (contactBtn.classList.contains('hidden')) {
        contactBtn.classList.remove('hidden');
        contactBtn.classList.add('flex');
    } else {
        contactBtn.classList.remove('flex');
        contactBtn.classList.add('hidden');
    }
})
// function loader 2sec delay
function loaderLoad() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();  
        }, 2000);
    });
}
// function for load Data
function loadData(api, cb) {
    const loader = getId('loader');
    const allPetsContainers = getId('allPetsContainers').children[0];
    loader.classList.remove('hidden');  
    allPetsContainers.classList.add('hidden');  
    
    fetch(api)
        .then(response => response.json())
        .then(data => {
            loaderLoad().then(() => {  
                cb(data.categories || data.pets || data.data);  
                loader.classList.add('hidden');  
                allPetsContainers.classList.remove('hidden');
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            loader.classList.add('hidden');
            allPetsContainers.innerHTML = `<div class="text-center">Error occurred while fetching data</div>`;
        });
}

// show ALL items
function showAllPets(datum) {
    let cardHTML = '';
    const allPetsContainers = getId('allPetsContainers').children[0];
    allPetsContainers.classList.add('sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
    allPetsContainers.innerHTML = '';
    if(datum.length > 0){
        for (let data of datum) {
            cardHTML += 
            `<div class="border border-gray-200 p-2 rounded-xl">
                <!-- card header -->
                <div>
                    <img src="${data.image}" class="w-full rounded" alt="">
                </div>
                <!-- card Body -->
                <div class="border-b border-gray-200 flex flex-col gap-1 pb-3 mt-2">
                <h3 class="text-lg md:text-xl font-bold">${data.pet_name}</h3> 
                <div class="flex items-center gap-1">
                    <img src="src/images/icons/Frame.png" alt="">
                    <p class="text-gray-700 text-base">Breed: ${!data.breed ? 'No Data Provided' : data.breed}</p>
                </div>
                <div class="flex items-center gap-1">
                    <img src="src/images/icons/Frame-1.png" alt="">
                    <p class="text-gray-700 text-base">Birth: ${!data.date_of_birth ? 'No Data Provided' : data.date_of_birth}</p>
                </div>
    
                <div class="flex items-center gap-1">
                    <img src="src/images/icons/Frame-2.png" alt="">
                    <p class="text-gray-700 text-base">Gender: ${!data.gender ? 'No Data Provided' : data.gender}</p>
                </div>
    
                <div class="flex items-center gap-1">
                    <img src="src/images/icons/Frame-3.png" alt="">
                    <p class="text-gray-700 text-base">Price : ${!data.price ? 'Call For Price' : data.price+'$'}</p>
                </div>
                </div>
                <!-- card footer -->
                <div class="grid grid-cols-3 gap-2 justify-between py-1 mt-2">
                    <button type="button" class="border-2 border-teal-100 flex items-center justify-center py-1 rounded-md hover:border-teal-200 cursor-pointer" id="${data.petId}" data-pet='${JSON.stringify(data).replace(/'/g, "&apos;")}' onclick="selectedData(this)">
                        <img src="src/images/icons/Frame 1171276315.png" class="w-5 h-5" alt="thumbsUp">
                    </button>
    
                    <button type="button" class="border-2 border-teal-100 flex justify-center py-1 rounded-md hover:border-teal-200 cursor-pointer text-gray-700 hover:text-gray-800">
                        Adopt
                    </button>
    
                    <button type="button" class="border-2 border-teal-100 flex justify-center py-1 rounded-md hover:border-teal-200 cursor-pointer text-gray-700 hover:text-gray-800" data-details = '${JSON.stringify(data).replace(/'/g, "&apos")}'
                    onclick="showDetails(this)"
                    >
                        Details
                    </button>
                </div>
            </div>`
        }
        allPetsContainers.innerHTML = cardHTML;
    }else{
        getId('selectedPets').classList.add('hidden');
        allPetsContainers.classList.remove('sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4');
        allPetsContainers.innerHTML = `
            <div class="flex flex-col items-center justify-center">
                <img src="../src/images/error.webp" alt="No data Found Img"/>
                <h2 class="mt-3 font-bold text-xl md:text-3xl lg:text-4xl text-center">No Data Found Here</h2>
            </div>
        `;
    }

}
// showDetails for Pets
function showDetails(data) {
    const getStringData = data.getAttribute('data-details');
    const getObjectData = JSON.parse(getStringData.replace(/&apos;/g,"'"));
    const modal1 = document.getElementsByClassName('details-content')[0];
    modal1.innerHTML = '';
    modal1.innerHTML += `
        <div>
            <!-- image section -->
            <div>
                <img src="${getObjectData.image}" class="w-full object-cover rounded-md" alt="pets image">
            </div>
            <!-- pets details section -->
                <div class="border-b border-gray-200 pb-2 mt-3">
                    <h2 class="font-bold footer-font text-lg md:text-xl lg:text-2xl">${getObjectData.pet_name}</h2>
                    <div class="grid grid-cols-7 mt-3 gap-1">
                        <p class="col-span-3 text-gray-700 text-base">Breed: ${getObjectData.breed ||'No Data Provided'}</p>
                        <p class="col-span-3 text-gray-700 text-base">Gender: ${getObjectData.gender || 'No Data Provided'}</p>
                        <p class="col-span-3 text-gray-700 text-base">Price : ${getObjectData.vaccinated_status || 'vaccinated Later'}</p>
                        <p class="col-span-3 text-gray-700 text-base">Birth: ${getObjectData.date_of_birth || 'No Data Provided'}</p>
                        <p class="col-span-3 text-gray-700 text-base">Price : ${getObjectData.price +'$' || 'Call For Price'}</p>
                    </div>
                </div>

                <!-- details Imgormation -->
                <div class="mt-3">
                    <h4 class="font-bold footer-font text-lg md:text-xl">Details Information</h4>
                    <p class="text-gray-700 text-base">${getObjectData.pet_details}</p>
                </div>
        </div>
    
    `
    // modal open
    getId('detailsPet').showModal();
}
// liked / selected Data
function selectedData(data) {
    const allPetsContainers = getId('allPetsContainers');
    const selectedPetContainer = getId('selectedPets');
    allPetsContainers.classList.add('md:col-span-7');
    allPetsContainers.children[0].classList.remove('md:grid-cols-3', 'lg:grid-cols-4');
    allPetsContainers.children[0].classList.add('md:grid-cols-2', 'lg:grid-cols-2', 'xl:grid-cols-3');
    selectedPetContainer.parentElement.classList.add('md:col-span-3');
    selectedPetContainer.classList.remove('md:grid-cols-2');
    selectedPetContainer.classList.add('md:grid-cols-1', 'lg:grid-cols-2');
    const petDataString = data.getAttribute('data-pet');
    const petData = JSON.parse(petDataString.replace(/&apos;/g, "'"));
    selectedPetContainer.innerHTML += `
        <div class="p-1 border border-gray-300 rounded-md ">
            <img src="${petData.image}" class="w-full object-cover" alt="selecteed Images">
        </div>
    `
}
// category Items Show
function categoryItemsShow(getData) {
    const categoryItem = getId('categoryItem');
    for (let category of getData) {
        categoryItem.innerHTML += `<button type="button" class="category-item flex justify-center gap-2 items-center border border-stone-200 p-2 rounded-md hover:bg-stone-100 cursor-pointer" id="${category.category}">
                <img src="${category.category_icon}" class="w-7 lg:w-14" alt="dog image">
                <h6 class="font-bold text-base md:text-xl lg:text-2xl">${category.category}</h6>
        </button>`;
    }
}
// show Categories Data
function CategoriesDataShow() {
    const categoryItem = getId('categoryItem');
    categoryItem.addEventListener('click', (event)=>{
        const target = event.target.closest('.category-item');
        if (!target) {
            return;
        };
        getId('allPetsContainers').children[0].innerHTML = '';
        loadData(`https://openapi.programming-hero.com/api/peddy/category/${target.id}`, showAllPets)
    })
}
CategoriesDataShow();
// Load Data From Dom
loadData(`https://openapi.programming-hero.com/api/peddy/pets`, showAllPets);
loadData(`https://openapi.programming-hero.com/api/peddy/categories`, categoryItemsShow);

