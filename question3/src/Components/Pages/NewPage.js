import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

const NewPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="text-center">
    <h1 class="display-1">Create a query Page</h1>

    <form id="query">Subject of your query</form>
  </div>`;

  const idea = document.getElementById('query');

  const content = document.createElement('input');
  content.type = 'text';
  idea.appendChild(content);

  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Submit your query';
  idea.appendChild(submitButton);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const demand = content.value; 

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: demand, status: "requested" }),
      };
      
      await fetch(`${process.env.API_BASE_URL}/queries`, options);
      window.location.href = '/queries';  
    } catch (error) {
      console.error('Error processing the query :', error);
    }
  };

  idea.addEventListener('submit', handleSubmit);
};



export default NewPage;
