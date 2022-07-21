<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ model.id ? model.title : 'Create New Survey' }}
        </h1>
      </div>
    </template>
    <template v-slot:content>
      <form @submit.prevent="saveSurvey">
        <div class="shadow rm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="mt-1 flex items-center">
                <img v-if="model.image_url" :src="model.image_url" :alt="model.title" class="w-64 h-48 object-cover">
                <span v-else
                      class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-[80%] w-[80%] text-gray-300" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </span>
                <button
                  type="button"
                  class="
                      relative
                      overflow-hidden
                      ml-5
                      bg-white
                      py-2
                      px-4
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      text-sm
                      leading-4
                      font-medium
                      text-gray-700
                      hover:bg-gray-50
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-indigo-500
                "
                >
                  <input type="file" class="absolute top-0 left-0 bottom-0 right-0 opacity-0" @change="onImageChange">
                  Change
                </button>
              </div>
            </div>

            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input type="text" id="title" name="text" v-model="model.title"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     autocomplete="survey_title">

            </div>
            <div>
              <label for="desciprtion" class="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea name="description" id="desciprtion" v-model="model.description"
                        autocomplete="survey_description"
                        placeholder="Describe your survey"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        rows="3"></textarea>
            </div>

            <div>
              <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
              <input type="date" name="expire_date" v-model="model.expire_date" id="expire_date"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">

            </div>

            <div class="flex items-center">
              <div class="flex items-center h-5">
                <input type="checkbox" name="status" v-model="model.status" id="status"
                       class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="status" class="font-medium text-gray-700">Active</label>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Save
              </button>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <h3 class="text-2xl font-semibold flex items-center justify-between">
              Questions
              <button type="button"
                      @click="addQuestion()"
                      class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
                Add Question
              </button>
            </h3>
            <div v-if="!model.questions.length" class="text-center text-gray-600">
              You don't have any questions created
            </div>
            <div v-for="(question, index) in model.questions" :key="question.id" class="mt-6 py-4">
              <QuestionEditor
                :question="question"
                :index="index"
                @change="questionChange"
                @addQuestion="addQuestion"
                @deleteQuestion="deleteQuestion"
              />
            </div>
          </div>
        </div>
      </form>
    </template>
  </PageComponent>
</template>

<script setup>
import PageComponent from "../../components/PageComponent.vue";
import {ref} from 'vue';
import {useRouter} from "vue-router";
import store from '../../store';
import QuestionEditor from '../../components/editor/QuestionEditor.vue'
import {v4 as uuid4} from 'uuid'

const router = useRouter();
const route = useRouter()
const model = ref({
  id: '',
  title: '',
  description: '',
  status: '',
  image: '',
  expire_date: '',
  questions: [],
})

if (route.currentRoute.value.params.id) {
  store.state.surveys.forEach((survey) => {
    if (survey.id == route.currentRoute.value.params.id) {
      model.value = survey
    }
  })
}

function addQuestion(index) {
  const newQuestion = {
    id: uuid4(),
    text: '',
    description: null,
    image_url: '',
    question: '',
    data: {}
  }
  model.value.questions.splice(index, 0, newQuestion)
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question)
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question))
    }
    return q
  })
}

function saveSurvey() {
  store.dispatch('saveSurvey', model.value).then(({data}) => {
    router.push({
      name: 'surveyView',
      params: {id: data.data.id}
    })
  })
}

function onImageChange(event) {
  const file = event.target.files[0]
  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result
    model.value.image_url = reader.result
  }
  reader.readAsDataURL(file)
}
</script>

