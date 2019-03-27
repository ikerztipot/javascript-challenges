window.onload = () => {
    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const checkAll = document.querySelector('#check-all');
    const uncheckAll = document.querySelector('#uncheck-all');

    function addItem(e){
        e.preventDefault();

        const item = {
            name: this.querySelector('[name=item]').value,
            done: false 
        };

        items.push(item);

        console.table(items);
        populateList(items, itemsList);
        localStorage.setItem('items', JSON.stringify(items));
        this.reset();
    }

    function populateList(plates = [], list){
        list.innerHTML = plates.map((plate, i) => {
            return `<li>
                        <input type="checkbox" id="item${i}" data-index="${i}" ${plate.done ? 'checked' : ''}>
                        <label for="item${i}">${plate.name}</label>
                    </li>`;
        }).join('');
    }

    function toggleDone(e){
        if(!e.target.matches('input')) return;
        const index = e.target.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem('items', JSON.stringify(items));
    }
    
    function checkAllItems(check){
        items.forEach(item => item.done = check);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList);
    }

    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    checkAll.addEventListener('click', () => checkAllItems(true));
    uncheckAll.addEventListener('click', () => checkAllItems(false));

    populateList(items, itemsList);
};