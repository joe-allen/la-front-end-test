<template>
	<div class="card--wrapper">
		<div class="card--container">
			<div class="card_panel--container">
				<div class="card_panel image">
					<!-- <img src="https://i5.walmartimages.com/asr/409830cd-0426-4d0d-bb2a-511880a2f7c1_1.ed04f89e7dbca6d87234a3c65dc7007a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF" alt=""> -->
				</div>
				<div class="card_panel" data-api-results="true">
					<div class="card_front--program_data">
						<div class="card_front--program_data">
							<h1>{{program.name}}</h1>
							<h2>{{program.id}}</h2>
							<p>{{program.captainLabel}}</p>
							<p>{{program.experienceLevel}}</p>
							<p>{{program.hasWaitlist}}</p>
							<p>{{program.programUrlHtml}}</p>
							<p>{{program.season}}</p>
							<p>{{program.sport}}</p>
						</div>
					</div>
					<div class="card_front--container shadow">
						<div class="card_front--header">
							<div class="card_front--header-text">
								<h1 v-if="!searchShow">2019 Programs ({{ programTotal }})</h1>
								<input v-show="searchShow" v-model="searchStr" @input="searchPrograms" ref="search" type="text" class="search--input" placeholder="Search">
								<div class="search--container">
									<span v-show="!searchShow" @click="seachOpenInput">
										<i class="fas fa-search"></i>
									</span>
									<span v-show="searchShow" @click="seachCloseInput">
										<i class="fas fa-times"></i>
									</span>
								</div>
							</div>
						</div>
						<div class="card_front--article">
							<div class="card_front--article-table">
								<div class="card_front--article-table_thead">
									<div class="card_front--article-table_td"><strong>Program</strong></div>
									<div class="card_front--article-table_td"><strong>Level</strong></div>
									<div class="card_front--article-table_td"><strong>Join</strong></div>
								</div>

								<div v-if="searchNoResults" class="loading--container"><span>No Results...</span></div>
								<!-- would consider replacing w/ custom svg loader for better ux -->
								<div v-if="loading" class="loading--container"><span>Loading...</span></div>

								<!-- programs will be dynamically inserted here via api fn `getPrograms()` -->
								<div v-else>
									<div v-show="searchStr == null" v-for="(program, index) in programs" class="card_front--article-table_trow" :key="program.index">
										<div class="card_front--article-table_td" :alt="program.name">{{ program.name }}</div>
										<div class="card_front--article-table_td" :alt="program.experienceLevel">{{ program.experienceLevel }}</div>
										<div @click="getProgramById(program.programId)" class="card_front--article-table_td">Details</div>
									</div>
									<div v-show="searchStr != null" v-for="(program, index) in programsFiltered" class="card_front--article-table_trow" :key="program.index">
										<div class="card_front--article-table_td" :alt="program.name">{{ program.name }}</div>
										<div class="card_front--article-table_td" :alt="program.experienceLevel">{{ program.experienceLevel }}</div>
										<div @click="getProgramById(program.programId)" class="card_front--article-table_td">Details</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import { getPrograms, getProgramById } from '../utils/api.js'

	export default {
		data() {
			return {
				focus: null,
				loading: true,
				programs: null,
				program: {
					id: null,
					name: null
				},
				programsFiltered: null,
				programTotal: null,
				searchNoResults: null,
				searchShow: false,
				searchStr: null,
				showProgramDetail: false,
			}
		},
		mounted() {
			getPrograms().then(results => {
				// ui updates
				this.loading = false;

				// store results
				this.programs = results;
				this.programTotal = results.length;
			});
		},
		beforeDestroy() {
			clearTimeout(this.focus)
		},
		methods: {
			searchPrograms () {
				let key;
				let results = [];
				let string = this.searchStr.toLowerCase();

				// loop programs
				for(key in this.programs) {
					// lowercase for compaison purposes
					let hayStack = this.programs[key].name.toLowerCase();

					if(hayStack.indexOf(string) > -1) {
					// push to array if search string found
						results.push(this.programs[key]);
					}
				}

				if(results.length > 0) {
					// show filtered results
					this.programsFiltered = results;
					// show "No results"
					this.searchNoResults = false;
				} else {
					// remove remaining results
					this.programsFiltered = null;
					// show "No results"
					this.searchNoResults = true;
				}
			},
			seachOpenInput () {
				// show search input
				this.searchShow = !this.searchShow;
				// focus on input for user
				this.focus = setTimeout(() => { this.$refs["search"].focus(); }, 500);
			},
			seachCloseInput () {
				// reset search input value
				this.searchStr = null;
				// reset "no results"
				this.searchNoResults = false;
				// hide search input
				this.searchShow = !this.searchShow;
			},
			getProgramById(id) {

				getProgramById(id).then(results => {
					let programDetails = document.getElementsByClassName('card_front--program_data')[0];
					let programImage = document.getElementsByClassName('image')[0];
					let boundingContainer = document.getElementsByClassName('card_panel');
					let programDetailsTopPosition;

					for(let i = 0; i < boundingContainer.length; i++) {
						if(boundingContainer[i].dataset.apiResults == "true") {
							programDetailsTopPosition = boundingContainer[i].getBoundingClientRect().top;

							// position program data container
							// programDetails.style.top = `${Math.ceil(programDetailsTopPosition)}px`;
							programDetails.style.height = "100%";
							console.log("boundingContainer: ", boundingContainer[i]);
							boundingContainer[i].scrollTo({top: 0, behavior: "smooth"});
						}
					}

					console.log("results: ", );

					// ui updates
					this.loading = false;
					this.showProgramDetail = false;

					if(results.length <= 1) {
						console.log("Error: Program not found");
					} else {
						this.program.id = results.programId;
						this.program.name = results.name;
						this.program.gender = results.gender
						this.program.captainLabel = results.captainLabel
						this.program.experienceLevel = results.experienceLevel
						this.program.hasWaitlist = results.hasWaitlist
						this.program.programUrlHtml = results.programUrlHtml
						this.program.season = results.season
						this.program.sport = results.sport

						console.log("Found", this.program);
					}

					// store results
					// this.programs = results;
					// this.programTotal = results.length;
				});
			}
		},
	}
</script>

<style lang="scss" scoped>

	@import '../assets/css/main.scss';

	.card--wrapper {
		height: 100%;
		width: 100%;
		margin: $my-3;
		display: flex;
		justify-content: center;
		align-content: center;
	}
	.card--container {
		width: 75vw;
		background-color: #fff;
		box-shadow: $shadow;
	}
	.card_panel--container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		height: 100%;

		& > div {
			width: 50%;
			position: relative;
		}
		& > div[data-api-results] {
			width: 100%;
			min-width: none;
			height: 80vh;
			overflow-y: auto;
		}
		.image {
			height: 100%;
			width: 100%;
			position: relative;
			overflow: hidden;
			background: url("https://i5.walmartimages.com/asr/409830cd-0426-4d0d-bb2a-511880a2f7c1_1.ed04f89e7dbca6d87234a3c65dc7007a.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF") no-repeat;
			background-position: center;
			background-size: cover;
			object-fit: cover;
		}
		[data-api-results] {
			padding: $p-3;
		}
	}
	.card_front--container {
		position: relative;
	}
	.card_front--header-text {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
	.card_front--article-table {
		position: relative;
	}
	.card_front--article-table_thead {
		color: $grey;
		background-color: #fff;
		z-index: 1;
		margin-top: 2rem;
		padding: 2rem 0 1rem;
		position: sticky;
		top: -30px;
		width: 100%;
		text-transform: uppercase;
		display: flex;
		justify-content: space-between;
	}
	.card_front--article-table_trow::after {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 1px;
		border-top: 1px solid;
		opacity: .2;
	}
	.card_front--article-table_trow:last-of-type::after {
		padding: 20px 0;
		border-bottom: none;
	}
	.card_front--article-table_trow {
		display: flex;
		justify-content: space-between;
		text-align: center;
		color: $grey;
		padding: 10px 0;
		position: relative;
	}
	.card_front--article-table_td:nth-of-type(1) {
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 75px;
		white-space: nowrap;
	}
	.card_front--article-table_td:nth-of-type(2) {
		text-align: right;
	}
	.card_front--article-table_td:nth-of-type(3) {
		cursor: pointer;
		transition: $transition;
		text-align: right;
		color: $link;
	}
	.card_front--article-table_td:nth-of-type(3):hover {
		text-decoration: underline;
		color: $linkHover;
	}
	.card_front--article-table_thead > .card_front--article-table_td:nth-of-type(3) {
		cursor: pointer;
		transition: $transition;
		text-align: right;
		color: inherit;
	}
	.card_front--article-table_thead > .card_front--article-table_td:nth-of-type(3):hover {
		cursor: default;
		color: inherit;
	}
	.card_front--article-table_td {
		font-weight: 400; /* increasing font-size on mobile since `100` is hard to read */
		width: 33.33%;
		padding: .65rem 0;
		white-space: nowrap;
	}
	.card_front--program_data {
		// margin-top: 30px;
		background-color: #fff;
		hyphens: auto;
		position: relative;
		z-index: 2;

		&.fixed {
			position: fixed;
		}
		&.show-details {
			animation: show-details;
			animation-iteration-count: 1;
			animation-fill-mode: forwards;
			animation-duration: 2s;
			animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
		}
	}
	.search--container span {
		cursor: pointer;
	}
	.search--input {
		border: none;
		width: 90%;
		font-size: $h4;
		color: $greyDark;
		padding: .5rem 0;
		border-bottom: 1px solid;
	}

	// media queries
	@media screen and (min-width: 540px) {
		.card_panel--container {
			flex-direction: row;
		}
		.card_panel--container {
			& > div[data-api-results] {
				height: 400px;
				min-width: 400px;
			}
		}
	}

	// keyframes
	@keyframes show-details {
		0% {
			top: inherit;
		}
		100% {
			top: 0;
		}
	}

</style>