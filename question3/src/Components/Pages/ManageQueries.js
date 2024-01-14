import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

async function fetchData() {
    const options = {
      method: 'GET',
    };
    
    const response = await fetch(`${process.env.API_BASE_URL}/queries`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

const ManageQueries = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="text-center">
    <h1 class="display-1">Manage queries Page</h1>
    <ul id="queryList"></ul>
  </div>`;

  const existingQueries = fetchData();
  const listContainer = document.getElementById('queryList');

  existingQueries.forEach((query) => {
    const listItem = document.createElement('li');
    listItem.textContent = query.subject;

    const statusList = document.createElement('select');
    const allStatus = ["requested", "accepted", "refused", "done"];

    for (let i = 0; i < allStatus.length; i++) {
        const option = document.createElement("option");
        option.value = allStatus[i];
        option.text = allStatus[i];
        if(option.text === query.status){
            option.selected = true;
        }
        statusList.add(option);
    }

    listContainer.appendChild(listItem);
    listContainer.appendChild(statusList);
  });

};
  
export default ManageQueries;
