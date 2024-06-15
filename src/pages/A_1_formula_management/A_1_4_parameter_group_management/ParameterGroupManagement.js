import React from "react";
import {ContentWithTitie} from "../../../components/Styles";
import ParameterGroupList from "./ParameterGroupList";
import ParameterGroupTableTitle from "./ParameterGroupTableTitle";

const ParameterGroupManagement = () => {
    return (
        <ContentWithTitie>
            <ParameterGroupTableTitle />
            <ParameterGroupList />
        </ContentWithTitie>
    )
}

export default ParameterGroupManagement;
