<template>
    <base-card>
        <h2>Add a Goal</h2>
        <goals-form :isEditing="false"></goals-form>
    </base-card>
</template>

<script>
import GoalsForm from '../../components/goals/GoalsForm.vue';

export default {
    components: {
        GoalsForm
    }
}
</script>