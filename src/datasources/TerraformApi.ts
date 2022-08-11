import { RESTDataSource } from 'apollo-datasource-rest'

export class TerraformApi extends RESTDataSource {
    constructor(context: object) {
        // Always call super()
        super()
        // Sets the base URL for the REST API
        this.baseURL = 'https://app.terraform.io/api/v2'
        this.context = context
    }

    authToken = process.env[`AUTH_TOKEN`]
    organizationName = process.env['ORGANIZATION_NAME']

    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${this.authToken}`)
        //request.headers.set('Authorization', `Basic ${this.authToken}`)
    }

    getWorkspaces(organizationName: String) {
        // Send a GET request to the specified endpoint
        return this.get(`/organizations/${encodeURIComponent(organizationName.toString())}/workspaces`)
    }
}
