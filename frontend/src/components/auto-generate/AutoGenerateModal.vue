<template>
	<base-modal class="auto-generate-modal" @close="closeModal">
		<template v-slot:header>
			<h3>Auto Generate</h3>
		</template>
		<template v-slot:body>
			<form @submit.prevent="submitAuto" class="auto-generate-form">
				<div class="remove-option">
					<p class="form-question">
						What do you want to do with your current upcoming meals?
					</p>
					<label for="remove">
						<input
							type="radio"
							id="remove"
							name="remove-option"
							value="remove"
							v-model="removeOption"
						/>
						Remove
					</label>
					<label for="keep">
						<input
							type="radio"
							id="keep"
							name="remove-option"
							value="keep"
							v-model="removeOption"
						/>
						Keep
					</label>
				</div>
				<div class="btn-container">
					<!-- TODO fix buttons to remove meals and generate based on option -->
					<base-button>Save</base-button>
				</div>
			</form>
		</template>
	</base-modal>
</template>

<script>
import UpcomingMealService from "../../services/UpcomingMealService";

export default {
	data() {
		return {
			removeOption: "remove",
		};
	},
	methods: {
		async submitAuto() {
			this.isLoading = true;
			if (this.removeOption === "remove") {
				for (const meal of this.upcomingMeals) {
					await UpcomingMealService.delete(meal._id);
				}
			}
			this.$router.push("/upcoming-meals/auto-generate");
			this.isLoading = false;
		},
		closeModal() {
			this.$emit("close");
		},
	},
};
</script>

<style lang="scss" scoped>
.modal h3 {
	margin: 0.8rem 0 1rem 0;
}

.modal .btn-container {
	margin-top: 1rem;
	display: flex;
	justify-content: space-evenly;
}

.auto-generate-modal >>> .modal {
	/* width: 29rem;
	height: 24rem; */
	width: fit-content;
	height: fit-content;
	text-align: left;
}

.auto-generate-form {
	display: grid;
	row-gap: 1.2rem;
}

.remove-option,
.generate-option {
	display: grid;
	padding-left: 2rem;
}

.form-question {
	margin-bottom: 0.4rem;
}
</style>
