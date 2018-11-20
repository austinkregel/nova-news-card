<template>
    <card style="height:350px;" class="px-2 pb-4 overflow-hidden bg-white overflow-y-scroll">
        <div class="flex justify-center items-centers">
            <div class="w-full  flex flex-wrap pt-2" v-if="!shouldPromptForApiKey">
                <h4 class="flex-grow">News</h4>
                <label class="mr-2">
                    <input type="radio" v-model="type" value="topStories"> Top Stories
                </label>
                <label>
                    <input type="radio" v-model="type" value="everything"> Everything
                </label>
                <select class="mt-2 w-full form-control form-select">
                    <option>US</option>
                 </select>
                <div class="w-full scroll-y pt-2">
                    <div v-for="story in stories">
                        <div class="p-2 mb-2 shadow rounded" style="background: #eef1f4;">
                            <h4>
                                <a class="text-primary no-underline" :href="story.url">{{ story.title}}</a>
                            </h4>
                            <div class="pt-1">{{ story.source.name }} - {{ story.author }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-3 py-3 flex-1 w-full" v-else>
                <h2 class="pb-4">We need your Api Key!</h2>
                <input v-model="api_key" type="text" class="w-full form-control form-input form-input-bordered">
                <div class="flex flex-wrap w-full mt-4">
                    <div class="flex-grow pt-2 text-small" style="color:#8795A1;">
                        News from <a href="https://newsapi.org" style="color:#8795A1;">newsapi.org</a>
                    </div>
                    <button class="ml-auto btn btn-default btn-primary" @click.prevent="saveKey">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </card>
</template>

<script>
export default {
    props: ['card'],
    data() {
        return {
            country: this.card.country,
            category: 'technology',
            type: 'topStories',
            shouldPromptForApiKey: false,
            allStories: [],
            topStories_: []
        }
    },
    watch: {
        type() {
            this.getStories();
        }
    },
    computed: {
        stories() {
            return this.allStories.concat(this.topStories_)
        },
        queryString() {
            return ['sources','domains','excludeDomains','from','to','language','sortBy','pageSize','page']
                .filter(key => (this.card[key])).map(key => key + '=' + this.card[key])
                .join('&')
        }
    },
    methods: {
        topStories() {
            axios.get('/nova-vendor/nova-news-card/news-proxy/top-headlines/' + this.country + '/' + this.category + (!this.queryString ? '' : this.queryString))
                .then(res => {
                    this.topStories_ = res.data[0].articles
                    this.allStories = [];
                })
                .catch(err => (this.shouldPromptForApiKey = true));

        },
        everything() {
            axios.get('/nova-vendor/nova-news-card/news-proxy/everything/publishedAt?q=' + this.country + ' news')
                .then(res => {
                    this.allStories = res.data[0].articles
                    this.topStories_ = [];
                })
                .catch(err => (this.shouldPromptForApiKey = true));
        },
        getStories() {
            this[this.type]()
        },
        saveKey() {
            axios.post('/nova-vendor/nova-news-card/news-proxy/set-api-key', {
                api_key: this.api_key
            })
                .then(r => (this.getStories()))
        },
    },
    mounted() {
        this.getStories();
    },
}
</script>
