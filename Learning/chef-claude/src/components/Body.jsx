import React from "react";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromMistral } from "../assets/ai.js";

export default function Body() {

    const [ingredients, setIngredients] = React.useState([])
    const [showRecipe, setShowRecipe] = React.useState(false);
    const [recipeData, setRecipe] = React.useState("");
    const recipeSection = React.useRef(null);

    function addIngredient(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        document.querySelector(".add-ingredient-form").reset()
    }

    async function showRecipeOn() {
        setShowRecipe(true);
        let recipe = await getRecipeFromMistral(ingredients);
        console.log(recipe);
        setRecipe(recipe);
    }

    React.useEffect(() => {
        if (recipeData !== "") recipeSection.current.scrollIntoView({behavior: "smooth"});
    }, [recipeData])

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} handleShowRecipe={showRecipeOn} refer={recipeSection}/>}
            {showRecipe && <ClaudeRecipe recipe={recipeData}/>}
        </main>
    )
}