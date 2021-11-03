//TODO: setup database
let db;
  //1 means it is Version 1. It is saying it is a version for what it needs to be store.
    // create a new db request for a "BudgetDB" database.
const request = indexDB.open("budget", 1);

request.onupgradeneeded = function (event) {
    // create object store called "BudgetStore" and set autoIncrement to true
    const db = event.target.results;
    db.createObjectStore("BudgetStore", {autoIncrement: true});
  };

  request.onsuccess = function (event) {
      console.log("'success")
    db = event.target.result;
    //set up to check if app is online before reading from db 
    if (navigator.onLine) {
        console.log('Backend onlinee!')
      checkDatabase();
    }
  };

  request.onerror = function (event) {
    // log error here
    console.log(`Woops! ${e.target.errorCode}`);
  };

  const saveRecord = (record) => {
    console.log('Save record invoked');
    // Create a transaction on the BudgetStore db with readwrite access
    const transaction = db.transaction(['BudgetStore'], 'readwrite');
  
    // Access your BudgetStore object store
    const store = transaction.objectStore('BudgetStore');
  
    // Add record to your store with add method.
    store.add(record);
  };