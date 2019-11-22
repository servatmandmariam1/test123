function initialiseLocalStorage() {
  window.localStorage.setItem("id", "1");
  window.localStorage.setItem("toDoListData", new Array() );
}

function getItems() {
  const result = window.localStorage.getItem("toDoListData");
  if (result === null || result.length === 0) { return result; }
  else { return JSON.parse(result); }
}

function getNewId() {
  const id = parseInt(window.localStorage.getItem("id"));
  window.localStorage.setItem("id", "" + (id + 1));
  return id;
}

function addTagItem (tag) {

}
function setItems(data) {
  window.localStorage.setItem("toDoListData", JSON.stringify(data));
}

function setTagsItems(tag) {
  window.localStorage.setItem("TagsList", JSON.stringify(tag));
}

function addItem(item) {
  if (window.localStorage.getItem("id") === null ||
      window.localStorage.getItem("toDoListData") === null ||
      window.localStorage.getItem("toDoListData").length === 0) {
    initialiseLocalStorage();
  }

  item.id = getNewId();
  let list = getItems();

  if (list.length === 0) { list = [item]; }
  else { list.push(item); }

  setItems(list);
  return list;
}

function findArrayId(id, list) {
  let i = 0;
  for (i; i < list.length; i++) {
    if (list[i].id === id) {
      break;
    }
  }
  return i;
}

function deleteItem(id) {
  let list = getItems();
  const i = findArrayId(id, list);
  list.splice(i, 1); // remove list[i] from list
  setItems(list);
  return list;
}

export function deleteTag(id) {
  let list = getTags();
  const j = findArrayId(id, list);
  list.splice(j, 1); // remove list[i] from list
  setTags(list);
  return list;
}

export function removeDeletedTagFromItems(name) {
  let itemsList = getItems();
  
  for ( let  i = 0 ; i<itemsList.length; i++){
    for ( let j = 0; j< itemsList[i].tags.length; j++){
      if (itemsList[i].tags[j].tag == name){
        itemsList[i].tags.splice(j,1);
      }
    }
  }

  setItems(itemsList);
  return itemsList;
}

function markItemAsTodoDone(id) {
  let list = getItems();
  const i = findArrayId(id, list);
  list[i].isDone = !list[i].isDone;
  setItems(list);
  return list;
}

function editItem(item) {
  let list = getItems();
  const i = findArrayId(item.id, list);

  if (item.title) { list[i].title = item.title; }
  if (item.description) { list[i].description = item.description; }
  if (item.deadline) { list[i].deadline = item.deadline; }
  if (item.priority) { list[i].priority = item.priority; }
  if (item.attachedImage) { list[i].attachedImage = item.attachedImage; }
  if (item.tags) { list[i].tags = item.tags; }

  setItems(list);
  return list;
}

function sortByIsDone(data) {
  return data.sort((a, b) => {
    return a.isDone === b.isDone ? 0 : a.isDone ? -1 : 1;
  });
}

function sortByPriority(data) {
  return data.sort((a, b) => {
    if (a.priority === "high") {
      return -1;
    } else if (a.priority === "middle") {
      if (b.priority === "high") {
        return 1;
      } else if (b.priority === "middle") {
        return 0;
      } else if (b.priority === "low") {
        return -1;
      }
    } else if (a.priority === "low") {
      return 1;
    }
  });
}

function sortItems(list) {
  if (list.length != 0) {
    let donePrioritisedList = sortByPriority(list.filter(item => item.isDone === true));
    let todoPrioritisedList = sortByPriority(list.filter(item => item.isDone === false));
    let resultingList = todoPrioritisedList.concat(donePrioritisedList);

    setItems(resultingList);
    return resultingList;
  }
  return null;
}

function searchItems(data, list) {
  if (list.length != 0) {
    return list.filter(
      item =>
        item.title.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
        item.description.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
        item.priority.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
        item.deadline.toLowerCase().indexOf(data.toLowerCase()) > -1
    );
  }
  return null;
}

function filterByDate(selected) {
  let date_now = new Date();
  let list = getItems();
  let filtered_list = list;

  if (selected === "today"){
    return filtered_list.filter( item => (new Date(item.deadline).getMonth() - date_now.getMonth() ===0) && (new Date(item.deadline).getDate() - date_now.getDate() === 0 ) );
  }
  else if (selected === "tomorrow") {
    return filtered_list.filter( item => (new Date(item.deadline).getDate() - date_now.getDate() == 1) && (new Date(item.deadline).getMonth() -  date_now.getMonth() === 0) );
  }
  else if (selected === "week") {

    return filtered_list.filter( item => (new Date(item.deadline).getDate() - date_now.getDate() >=0) && ( new Date(item.deadline).getDate() - date_now.getDate() <=7 ) && new Date(item.deadline).getMonth() - date_now.getMonth() == 0);
  }
  else if(selected === "month") {
    return filtered_list.filter( item => (new Date(item.deadline).getMonth() - date_now.getMonth() == 0) && (new Date(item.deadline).getDate() -  (date_now).getDate() >=0) );
  }
  return null;
}

function filterByTags(list) {
  let tasks = getItems();
  let choosenTags = list.filter( (item) => item.marked === true);
  let tags = [];
  for ( let i = 0; i<=choosenTags.length-1 ; i++){
    tags.push(choosenTags[i].name);
  }

  if (tags.length!==0) {

    return tasks.filter (task => {
        return task.tags.some ( item => {
          console.log(item)
          return(tags.indexOf(item.tag)!= -1);
        });
      });
  }
  else  {
    console.log('empty')
    return (getItems());
  }
}

function deadlineValidation(deadline) {
  if (deadline) {
    let date = deadline.split("-");
    let today = new Date();
    if (date[0] < today.getFullYear()) {
      date[0] = today.getFullYear();
    }
    return "" + date[0] + "-" + date[1] + "-" + date[2];
  } else {
    return deadline;
  }
}

function validateExtension(name) {
  const nameSplitted = name.split(".");
  const extension = nameSplitted[nameSplitted.length-1];
  const validExtensions = ["apng", "bmp", "gif", "ico", "cur", "jpg", "jpeg", "jfif",
                           "pjpeg", "pjp", "png", "svg", "tif", "tiff", "webp"];
  if (validExtensions.find(item => item === extension)) { return true; }
  return false;
}

function attachedImageValidation(files) {
  if (files) {
    if (files.length) {
      if ((files[0].size / 1024) > 200) { return false; }
      if (!validateExtension(files[0].name)) { return false; }
      return true;
    }
  }
  return false;
}

function toBase64Promise(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function initialiseLocalStorageForTags() {
  window.localStorage.setItem("idForTags", "1");
  window.localStorage.setItem("AvailableTags", new Array());
}

export function getNewIdForTags() {
  const id = parseInt(window.localStorage.getItem("idForTags"));
  window.localStorage.setItem("idForTags", "" + (id + 1));
  return id;
}

export function getTags() {
  const result = window.localStorage.getItem("AvailableTags");
  if (result === null || result.length === 0) { return result; }
  else { return JSON.parse(result); }
}

export function setTags(data) {
  window.localStorage.setItem("AvailableTags", JSON.stringify(data));
}

export function addTag(item) {
  if (window.localStorage.getItem("idForTags") === null ||
      window.localStorage.getItem("AvailableTags") === null ||
      window.localStorage.getItem("AvailableTags").length === 0) {
    initialiseLocalStorageForTags();
  }

  item.id = getNewIdForTags();
  let list = getTags();

  if (list.length === 0) { list = [item]; }
  else { list.push(item); }

  setTags(list);
  return list;
}

export { getItems, setItems, addItem, editItem, deleteItem, markItemAsTodoDone,
         sortItems, searchItems, deadlineValidation, filterByDate,
         attachedImageValidation, toBase64Promise, filterByTags, addTagItem };
