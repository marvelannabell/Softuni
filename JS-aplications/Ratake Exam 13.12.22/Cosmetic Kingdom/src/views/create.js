import { createCard } from "../api/data.js";
import { html } from "../lib.js";
import { submitHandler } from "../util.js";

export async function createView(ctx) {
  ctx.render(createTemplate(submitHandler(onSubmit)))

      async function onSubmit({name,imageUrl, category, description, price}) {
          if (name == "" || imageUrl == "" || category == "" || description == "" || price == "") {
              return alert('All fields are required')
          }
          await createCard({name,imageUrl, category, description, price});
          ctx.page.redirect('/catalog')
      }
}
const createTemplate = (onSubmit) => html`<section id="create">
<div class="form">
  <h2>Add Product</h2>
  <form @submit=${onSubmit} class="create-form">
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Product Name"
    />
    <input
      type="text"
      name="imageUrl"
      id="product-image"
      placeholder="Product Image"
    />
    <input
      type="text"
      name="category"
      id="product-category"
      placeholder="Category"
    />
    <textarea
      id="product-description"
      name="description"
      placeholder="Description"
      rows="5"
      cols="50"
    ></textarea>
    
    <input
      type="text"
      name="price"
      id="product-price"
      placeholder="Price"
    />

    <button type="submit">Add</button>
  </form>
</div>
</section>
`;



