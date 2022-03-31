<template>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="title">Title</label> 
            <input type="text" id="title" :value="isEditing">
            <!-- if isEditing is true, fill in the values. if not, keep values blank -->
        </div>

        <div class="form-control">
            <input type="radio" id="fitness" name="category" value="Fitness">
            <label for="fitness">Fitness</label>

            <input type="radio" id="nutrition" name="category" value="Nutrition">
            <label for="nutrition">Nutrition</label>

            <input type="radio" id="other" name="category" value="Other">
            <label for="other">Other</label>
        </div>

        <div class="form-control">
            <label for="start-date">Start Date</label>
            <input type="date" id="start-date" name="start-date">
            <label for="end-date">End Date</label>
            <input type="date" id="end-date" name="end-date">
        </div>

        <input type="submit">
    </form>
</template>

<script>
export default {
    props: {
        isEditing: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        submitForm() {
            console.log("form submitted");
        }
    }
}
</script>