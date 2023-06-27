
import ConfigurationService from "Infrastructure/Services/ConfigurationService";
import DBContext from "Infrastructure/DBModels/DBContext";
import Authentication from "Infrastructure/Authentication/Authentication";
import Identity from "Infrastructure/Authentication/Identity";
import InfrastructureLibrary from "Infrastructure/index";
import ApplicationLibrary from "Application/index";

class TestSetup {

    public static DatabaseInfrastructure: DBContext;
    public static AuthenticationInfrastructure: Authentication;
    public static IdentityInfrastructure: Identity;
    public static Application: any = null;

    /**
     * this method will setup 
     * configuration service,
     * Database Infrastructure,
     * Authentication Infrastructure,
     * Identity Infrastructure
     * 
     * to be used in testing.
     */
    public static Setup(): void {
        
        // singleton initiation of configuration infrastructure
        // let config: ConfigurationService = new ConfigurationService("../SmallApp/configuration.json");


        // initiating infrastructures
        let infrastructure = InfrastructureLibrary();

        // singleton initiation of configuration infrastructure
        let config: ConfigurationService = infrastructure.Configuration;

        // singleton initiation of Database infrastructure
        if(!TestSetup.DatabaseInfrastructure){
            TestSetup.DatabaseInfrastructure = infrastructure.Database;
        }
        
        // singleton initiation of Authentication infrastructure
        if(!TestSetup.AuthenticationInfrastructure){
            TestSetup.AuthenticationInfrastructure = infrastructure.Authentication;
        }

        // singleton initiation of Identity infrastructure
        if(!TestSetup.IdentityInfrastructure){
            TestSetup.IdentityInfrastructure = infrastructure.Identity;
        }


        //initiating main application logic
        if(!TestSetup.Application){
            TestSetup.Application = ApplicationLibrary(infrastructure.Database, infrastructure.Authentication, infrastructure.Identity, infrastructure.Mailer);
        }

    }

}

export default TestSetup;