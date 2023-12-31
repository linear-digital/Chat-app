import { all, call, fork, put, takeEvery } from 'redux-saga/effects';



const OPENAI_API_KEY = "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";
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});
function* aiChat({ payload: { text } }) {
    try {

    } catch (error) {

        // yield put(apiError(error));
    }
}