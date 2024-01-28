import ApiEndpoints from "@apiEndpoints";
import { Catched, eveTechApi } from "@/custom/utils/actions/global";
import * as _ from "lodash";

const HelpDesk: any = {
     createTicket: async (payload: any) => {
        try {
            const response = await eveTechApi.post(
            `${ApiEndpoints.HELP_CREATE_TICKET}`,
            payload
            );
            return response;
        } catch (error: any) {
            return Catched(error);
        }
    },
};

export default HelpDesk;