<style scoped>
    .action-link {
        cursor: pointer;
    }

    .m-b-none {
        margin-bottom: 0;
    }
</style>

<template>
    <div>
        <div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>
                            Personal Access Tokens
                        </span>

                        <a class="action-link" @click="createTokenModal('show')">
                            Create New Token
                        </a>
                    </div>
                </div>

                <div class="panel-block">
                    <!-- No Tokens Notice -->
                    <p class="m-b-none" v-if="tokens.length === 0">
                        You have not created any personal access tokens.
                    </p>

                    <!-- Personal Access Tokens -->
                    <table class="table table-borderless m-b-none" v-if="tokens.length > 0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="token in tokens">
                                <!-- Client Name -->
                                <td style="vertical-align: middle;">
                                    {{ token.name }}
                                </td>

                                <!-- Delete Button -->
                                <td style="vertical-align: middle;">
                                    <a class="action-link text-danger" @click="revoke(token)">
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Create Token Modal -->
        <div v-bind:class="showCreateTokenModal" class="modal" id="modal-create-token" tabindex="-1" role="dialog">
            <div class="modal-background"></div>
            
            <div class="modal-card">
                <div class="box">
                    <div class="modal-card-head">
                        

                        <h4 class="modal-card-title">
                            Create Token
                        </h4>
                        <button class="delete"  @click="createTokenModal('hide')" aria-label="close"></button>
                    </div>

                    <div class="modal-card-body">
                        <!-- Form Errors -->
                        <div class="alert alert-danger" v-if="form.errors.length > 0">
                            <p><strong>Whoops!</strong> Something went wrong!</p>
                            <br>
                            <ul>
                                <li v-for="error in form.errors">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <!-- Create Token Form -->
                        <form  role="form" @submit.prevent="store">
                            <!-- Name -->
                            <div class="field">
                                <label class="label">Name</label>

                                <div class="control">
                                    <input ref="create_token_name" id="create-token-name" type="text" class="input" name="name" v-model="form.name">
                                </div>
                                
                            </div>

                            <!-- Scopes -->
                            <div class="field" v-if="scopes.length > 0">
                                <label class="label">Scopes</label>

                                <div class="control">
                                    <div v-for="scope in scopes">
                                        
                                            <label class="checkbox">
                                                <input type="checkbox"
                                                    @click="toggleScope(scope.id)"
                                                    :checked="scopeIsAssigned(scope.id)">

                                                    {{ scope.id }}
                                            </label>
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-card-foot">
                        <button class="modal-close is-large" aria-label="close" @click="createTokenModal('hide')"  aria-hidden="true"></button>

                        <button type="button" class="button" @click="store">
                            Create
                        </button>
                    </div>
                </div>
            </div>
            
        </div>



        <!-- Access Token Modal -->
        <div class="modal" v-bind:class="showTokenAccessModal" id="modal-access-token" tabindex="-1" role="dialog">
            <div class="modal-background"></div>
            
                <div class="modal-card">
                    <div class="modal-card-head">
                        

                        <h4 class="modal-card-title">
                            Personal Access Token
                        </h4>
                        <button class="delete"  @click="newTokenModal('hide')" aria-label="close"></button>
                    </div>

                    <div class="modal-card-body">
                        <p>
                            Here is your new personal access token. This is the only time it will be shown so don't lose it!
                            You may now use this token to make API requests.
                        </p>

                        <pre><code>{{ accessToken }}</code></pre>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-card-foot">
                        <button type="button" class="button" @click="newTokenModal('hide')">Close</button>
                    </div>
                </div>
           
        </div>
    </div>
</template>

<script>
    export default {
        /*
         * The component's data.
         */
        data() {
            return {
                accessToken: null,
                
                showCreateTokenModal : {'is-active': false },
                showTokenAccessModal : {'is-active': false },
                

                tokens: [],
                scopes: [],

                form: {
                    name: '',
                    scopes: [],
                    errors: []
                }
            };
        },

        /**
         * Prepare the component (Vue 1.x).
         */
        ready() {
            this.prepareComponent();
        },

        /**
         * Prepare the component (Vue 2.x).
         */
        mounted() {
            this.prepareComponent();
        },

        methods: {
            /**
             * Prepare the component.
             */
            prepareComponent() {
                this.getTokens();
                this.getScopes();
            },

            /**
             * Get all of the personal access tokens for the user.
             */
            getTokens() {
                axios.get('/oauth/personal-access-tokens')
                        .then(response => {
                            this.tokens = response.data;
                        });
            },

            /**
             * Get all of the available scopes.
             */
            getScopes() {
                axios.get('/oauth/scopes')
                        .then(response => {
                            this.scopes = response.data;
                        });
            },

            /**
             * Show/hide the modal for creating a token.
             */
            createTokenModal(action = 'hide') {
                if (action == 'show'){

                    this.showCreateTokenModal['is-active'] = true
                
                    this.$nextTick(() => this.$refs.create_token_name.focus())

                    return
                }
                this.showCreateTokenModal['is-active'] = false    
            },

            /**
             * Show/hide the new token modal
             */
            newTokenModal(action = 'hide') {
                if (action == 'show'){
                    this.showTokenAccessModal['is-active'] = true
                    return
                }
                this.showTokenAccessModal['is-active'] = false   

            },

            /**
             * Create a new personal access token.
             */
            store() {
                this.accessToken = null;

                this.form.errors = [];

                axios.post('/oauth/personal-access-tokens', this.form)
                        .then(response => {
                            this.form.name = '';
                            this.form.scopes = [];
                            this.form.errors = [];

                            this.tokens.push(response.data.token);

                            this.showAccessToken(response.data.accessToken);
                        })
                        .catch(error => {
                            if (typeof error.response.data === 'object') {
                                this.form.errors = _.flatten(_.toArray(error.response.data));
                            } else {
                                this.form.errors = ['Something went wrong. Please try again.'];
                            }
                        });
            },

            /**
             * Toggle the given scope in the list of assigned scopes.
             */
            toggleScope(scope) {
                if (this.scopeIsAssigned(scope)) {
                    this.form.scopes = _.reject(this.form.scopes, s => s == scope);
                } else {
                    this.form.scopes.push(scope);
                }
            },

            /**
             * Determine if the given scope has been assigned to the token.
             */
            scopeIsAssigned(scope) {
                return _.indexOf(this.form.scopes, scope) >= 0;
            },

            /**
             * Show the given access token to the user.
             */
            showAccessToken(accessToken) {
                this.createTokenModal('hide')

                this.accessToken = accessToken;

                this.newTokenModal('show')
            },

            /**
             * Revoke the given token.
             */ 
            revoke(token) {
                axios.delete('/oauth/personal-access-tokens/' + token.id)
                        .then(response => {
                            this.getTokens();
                        });
            }
        }
    }
</script>
