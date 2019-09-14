var digimonList = (function () {
  var repository = [];

  var apiUrl = 'https://digimon-api.herokuapp.com/api/digimon';

  function showDetails(item) {
    digimonList.loadDetails(item).then(function (digimon) {
      showModal(digimon);
    })
  };

  // Creates new elements to add into the DOM
  function addListItem(digimon) {
    var $listItem = document.createElement('li');
    var $button = document.createElement('button');
    $button.innerText = digimon.name;
    $button.classList.add('digimon_button');
    $listItem.appendChild($button);
    $Digilist.appendChild($listItem);
    $button.addEventListener('click', function(event) {
      showDetails(digimon);
    })
  };

  function getAll() {
    return repository;
  };

  function add(digimon) {
      repository.push(digimon);
  };

  function loadList() {
      return fetch(apiUrl).then(function (item) {
        var digimon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(digimon);
        }).catch(function (e) {
        console.error(e);
      })
    };

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.id = details.id;
      item.level = Object.keys(details.level);
      return item
    }).catch(function (e) {
      console.error(e);
    });
  };

  function showModal(digimon) {
    var $modalDigimon = document.querySelector('#modal-digimon');

    $modalDigimon.innerHTML = '';

    var modal = document.createElement('div');

    modal.classList.add('modal');

    var closeButtonElement = document.createElement('button');

    closeButtonElement.classList.add('modal-close');

    closeButtonElement.innerText = 'Close';

    closeButtonElement.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = digimon.name;

    var imageElement = document.createElement('img');
    imageElement.classList.add('modal-img');
    imageElement.setAttribute("src", digimon.imageUrl);

    var levelElement = document.createElement('p');
    levelElement.innerText = digimon.level;


    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    $modalDigimon.appendChild(modal);

    $modalDigimon.classList.add('is-visible');
  };

  function hideModal() {
    var $modalDigimon = document.querySelector('#modal-digimon');
    $modalDigimon.classList.remove('is-visible');
  };

  window.addEventListener('keydown', (e) => {
    var $modalDigimon = document.querySelector('#modal-digimon');
    if (e.key === 'Escape' && $modalDigimon.classList.contains('is-visible')) {
      hideModal();
    }
  });

  var $modalDigimon = document.querySelector('#modal-digimon');
  $modalDigimon.addEventListener('click', (e) => {
    var target = e.target;
    if (target === $modalDigimon) {
      hideModal();
    }
  });

  // Objects returning outside the IIFE

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

})(); // IIFE ends here

var $Digilist = document.querySelector('.Digilist');

digimonList.loadList().then(function(digimon) {
  digimonList.getAll().forEach(function(digimon) {
    digimonList.addListItem(digimon);
  })
});
