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
