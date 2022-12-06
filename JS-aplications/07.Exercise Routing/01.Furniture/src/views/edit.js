import { html, until } from '../lib.js';
import { editItem, getById } from '../api/data.js';


const editTemplate = (itemPromise) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Edit Furniture</h1>
                <p>Please fill all fields.</p>
            </div>
            ${until(itemPromise, html`<p>loading &hellip;</p>`)}
        </div>
        `;

const formTemplate = (item, onSubmit, errorMsg, errors) => html`
<form @submit = ${onSubmit}>
${errorMsg ? html`<div class="form-group error">${errorMsg}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make" .value=${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model" .value=${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year" .value=${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description" .value=${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price" .value=${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img" .value=${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class=${"form-control" + (errors.material ? ' is-invalid' : '')} id="new-material" type="text" name="material" .value=${item.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;

export function editView(ctx) {
    const id = ctx.params.id;
    const itemPromise = getById(id);//няма await и връща promise

    update(itemPromise, null, {})
    function update(itemPromise, errorMsg, errors) {
        ctx.render(editTemplate(loadItem(itemPromise, errorMsg, errors)));
    };
    async function loadItem(itemPromise, errorMsg, errors) {
        const item = await itemPromise;

        // const userData = getUserData();

        return formTemplate(item, onSubmit, errorMsg, errors)
    };

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const missing = Object.entries(data).filter(([k, v]) => k != "material" && v.trim() == "")
        console.log(missing);
        try {
            if (missing.length > 0) {
                const errors = {}
                missing.forEach(([a, b]) => errors[a] = true)

                throw {
                    error: new Error("Please fill all mandatory fields"), //return alert("Please fill all mandatory fields");
                    errors
                }
            }
            
            const result = await editItem(ctx.params.id, data);
            e.target.reset();
            ctx.page.redirect('/details/' + result._id);
        } catch (err) {
            const message = err.message || err.error.message;
            update(data, message, err.errors || {});
        }
    }
}
