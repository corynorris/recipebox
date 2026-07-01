import { useState, type FormEvent, type ChangeEvent } from "react";
import TagsInput from "react-tagsinput";
import type { MappedRecipe } from "../types";

interface RecipeFormProps {
  submitText: string;
  recipe: MappedRecipe;
  handleSubmit: (recipe: MappedRecipe) => void;
}

interface FormState {
  name: string;
  image: string;
  description: string;
  ingredients: string[];
}

function recipeToFormState(recipe: MappedRecipe): FormState {
  return {
    name: recipe.name || "",
    image: recipe.image || "",
    description: recipe.description || "",
    ingredients: recipe.ingredients || [],
  };
}

function formStateToRecipe(
  form: FormState,
  recipe: MappedRecipe,
): MappedRecipe {
  return {
    ...recipe,
    ...form,
  };
}

function validateImage(url: string, timeoutT: number): Promise<string> {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    const timer = setTimeout(function () {
      img.src = "";
      reject("Image loads too slowly.");
    }, timeoutT);
    img.onerror = img.onabort = function () {
      clearTimeout(timer);
      reject("Invalid image.");
    };
    img.onload = function () {
      clearTimeout(timer);
      resolve("success");
    };
    img.src = url;
  });
}

function validateFields(form: FormState): boolean {
  return (
    form.name.length > 0 &&
    form.description.length > 0 &&
    form.image.length > 0 &&
    form.ingredients.length > 0
  );
}

const RecipeForm = ({
  recipe: initialRecipe,
  submitText,
  handleSubmit,
}: RecipeFormProps) => {
  const [form, setForm] = useState<FormState>(recipeToFormState(initialRecipe));
  const [error, setError] = useState("");

  const submitRecipe = (e: FormEvent) => {
    e.preventDefault();
    if (validateFields(form)) {
      validateImage(form.image, 5000).then(
        function () {
          handleSubmit(formStateToRecipe(form, initialRecipe));
        },
        function (msg: string) {
          setError(msg);
        },
      );
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div>
      {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitRecipe}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((f) => ({ ...f, name: e.target.value }))
            }
            value={form.name}
          />
        </div>
        <div className="form-row">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm((f) => ({ ...f, image: e.target.value }))
            }
            value={form.image}
          />
        </div>
        <div className="form-row-tag">
          <label htmlFor="ingredients">Ingredients</label>
          <TagsInput
            id="ingredients"
            onChange={(tags: string[]) =>
              setForm((f) => ({ ...f, ingredients: tags }))
            }
            addOnBlur={true}
            value={form.ingredients}
          />
        </div>
        <div className="form-row">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            value={form.description}
          />
        </div>
        <button type="submit">{submitText}</button>
      </form>
    </div>
  );
};

export default RecipeForm;
