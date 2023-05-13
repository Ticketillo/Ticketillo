import { OpenAPI } from "api/service";
import { config } from "config";

OpenAPI.TOKEN = async () => /*(await AuthTokenStorage.get()) || */ "";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.BASE = config.backendUrl;
OpenAPI.CREDENTIALS = "omit";
