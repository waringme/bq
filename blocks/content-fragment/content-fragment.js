function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.querySelectorAll(`meta[${attr}="${name}"]`)]
    .map((m) => m.content)
    .join(', ');
  return meta || '';
}

//const aem = "http://localhost:4503";
//const aem = "https://publish-p107058-e1001010.adobeaemcloud.com";
const aem = "https://publish-p150634-e1553296.adobeaemcloud.com";
const cors = "https://cors.cpilsworth.workers.dev/?target=";

export default function decorate(block) {

  const slugID = document.createElement('div');
  slugID.id = 'slug';
  slugID.textContent = block.querySelector('div:nth-child(1)').textContent.trim();
  block.querySelector('div:nth-child(1)').replaceWith(slugID);

  const destinationDiv = document.createElement('div');
  destinationDiv.id = `destination-${slugID.textContent}`;
  block.querySelector('div:last-of-type').replaceWith(destinationDiv);
  console.log("Slug ID");  
console.log(slugID.textContent);
console.log(Date.now());

//const urlEndpoint = cors + aem + "/graphql/execute.json/bq/getPageBySlugAndVariation;slug=" + slugID.textContent +"?ck=1";
const urlEndpoint = cors + aem + "/graphql/execute.json/bq/getPageBySlugAndVariation;slug=1?ck=" + Date.now();
console.log(urlEndpoint);

// fetch('https://cors.cpilsworth.workers.dev/?target=https://publish-p150634-e1553296.adobeaemcloud.com/graphql/execute.json/nationwide/mortgage-offer-by-slug;slug=offer-1')

 fetch(urlEndpoint)
    .then(response => response.json())
    .then(response => {
      const {  image, type, description} = response.data.lawnmowerInformationList.items[0];
      const imageURL = `${aem}${image._dynamicUrl}`;

      console.log(type);

   

console.log("description");
console.log(description.html);
//console.log("furtherInformation");
//console.log(furtherInformation.html);

      destinationDiv.innerHTML = `
        <div class='destination-image'>
          <img src="${imageURL}" alt="ssssssssssss">
        </div>
        <div class='destination-content'>
          <div class='destination-content-type'><h3>${type}</h3></div>
          <div class='destination-content-description'><h3>${description.html}</h3></div>
  

        </div>
      `;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

}