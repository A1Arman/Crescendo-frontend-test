import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { RecipeContextProvider } from './context/recipe-context';
import { SpecialsContextProvider } from './context/specials-context';
import recipes from './apis/recipes';
import specials from './apis/specials';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import RecipesList from './components/RecipesList/RecipesList';
import SpecialsList from './components/SpecialsList/SpecialsList';
import AppNav from './components/AppNav/AppNav';
import Recipe from './components/Recipe/Recipe';
import AddRecipe from './components/AddRecipe/AddRecipe';
import AddSpecial from './components/AddSpecial/AddSpecial';
import UpdateRecipe from './components/UpdateRecipe/UpdateRecipe';
import UpdateSpecial from './components/UpdateSpecial/UpdateSpecial';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      specials: null,
      isLoading: false,
      isShowing: false
    }
  }

  componentDidMount() {
    this.getRecipes();
    this.getSpecials();
  }

  getRecipes = async () => {
    const response = await recipes.get('/recipes');
    const { data } = response;
    this.setState({ recipes: data })
  }

  getSpecials = async () => {
    const response = await specials.get('/specials');
    const { data } = response;
    this.setState({ specials: data })
  }

  addRecipeHandler = (recipe) => {
    this.setState({ recipes: [...this.state.recipes, recipe]})
  }

  updateRecipe = (id, recipe) => {
    const recipeIndex = this.state.recipes.findIndex(recipe => recipe.uuid === id);
    const newRecipe = {
          uuid: this.state.recipes[recipeIndex].uuid,
          title: recipe.title,
          images: this.state.recipes[recipeIndex].images,
          description: recipe.description,
          servings: recipe.servings,
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          postDate: this.state.recipes[recipeIndex].postDate,
          editDate: recipe.editDate,
          ingredients: recipe.ingredients,
          directions: recipe.directions
    }
    const newRecipeArr = [...this.state.recipes];
    newRecipeArr.splice(recipeIndex, 1);
    newRecipeArr.push(newRecipe);
    this.setState({ recipes: newRecipeArr});
  }

  updateSpecial = (id, special) => {
    const specialIndex = this.state.specials.findIndex(special => special.uuid === id);
    const newSpecial = {
      uuid: this.state.specials[specialIndex].uuid,
      ingredientId: this.state.specials[specialIndex].ingredientId,
      title: special.title,
      type: special.type,
      geo: special.geo,
      text: special.text
    }
    const newSpecialArr = [...this.state.specials];
    newSpecialArr.splice(specialIndex, 1);
    newSpecialArr.push(newSpecial);
    this.setState({ specials: newSpecialArr});
  }

  addSpecialHandler = (special) => {
    this.setState({ specials: [...this.state.specials, special]})
  }

  render() {
    const recipeContextVal = {
      recipes: this.state.recipes,
      addRecipe: (recipe) => this.addRecipeHandler(recipe),
      updateRecipe: (id, recipe) => this.updateRecipe(id, recipe),
      specials: this.state.specials
    }
    const specialsContextVal = {
      specials: this.state.specials,
      recipes: this.state.recipes,
      addSpecial: (special) => this.addSpecialHandler(special),
      updateSpecial: (id, special) => this.updateSpecial(id, special)
    }

    return (
      <div className="App">
        <header className="App-header">
          <Route path='/' component={AppNav} />
        </header>
        <main>
        <Route exact path='/' component={LandingPage} />
        <RecipeContextProvider value={recipeContextVal}>
          <Route exact path='/recipes' component={RecipesList} />
          <Route exact path='/recipes/:uuid' component={Recipe} />
          <Route exact path='/recipes/addRecipe' component={AddRecipe} />
          <Route exact path='/recipes/updateRecipe/:uuid' component={UpdateRecipe} />
        </RecipeContextProvider>
        <SpecialsContextProvider value={specialsContextVal}>
          <Route exact path='/specials' component={SpecialsList} />
          <Route exact path='/specials/addSpecial' component={AddSpecial} />
          <Route exact path='/specials/:uuid' component={UpdateSpecial} />
        </SpecialsContextProvider>
        </main>
        <footer>
          <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"  title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    );
  }
}


export default App;
