import React from "react";
import { CardBody, FormCheckbox, FormInput } from "shards-react";
import Margin from "./CompoundComponents/Margin";
import ThemedCard from "./UIElements/ThemedCard";
import ThemedCardTitle from "./UIElements/ThemedCardTitle";
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ButtonCustom from "./UIElements/ButtonCustom";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import styled from "styled-components"
import { toast } from "react-toastify"
import AddIcon from '@material-ui/icons/Add';
import { isValidUrl } from "../utils"
import AnchorButton from "./UIElements/AnchorButton"


const GET_USER_PROVIDERS = gql`

{
  getProvidersForUser{
    provider
    source
  }
}
`

const ADD_PROVIDER = gql`

mutation addProvider($sourceLink: String!){
  addProvider(provider: { provider: $sourceLink, source: $sourceLink, frequency: "" }) {
    provider
  }
}
`

const REMOVE_PROVIDER = gql`

mutation removeProvider($provider: String!){
  removeProvider(provider:{
    provider:$provider,
    source:"",
    frequency:""
  })
}
`

const GET_ALL_PROVIDERS = gql`

query getAllProviders($str: String){
  getProviders(
    page:0,
    range: 10,
    order: "ASC",
    orderBy: "source",
    filters:[
      {provider:$str, connector: "OR"},
      {source:$str, connector: "OR"},
    ]){
    source
    provider
  }
}
`

const StyledMarginButtonCustom = styled(ButtonCustom)`
    overflow: hidden;
    padding: 0;
    margin: 0.5em;
`

const StyledDisplayFlexDiv = styled.div`
    display: flex;
`

const StyledDisplayCenterFlexDiv = styled(StyledDisplayFlexDiv)`
    justify-content: center;
`

const StyledDisplayAlignCenterFlexDiv = styled(StyledDisplayFlexDiv)`
    align-items: center;
`

const StyledRelativeDiv = styled.div`
    position: relative;
    &:focus-within {
        .floatingDiv{
            display: unset;
        }
    }
`

const StyledFloatingDiv = styled.div`
    position: absolute;
    z-index: 1;
    max-height: 10em;
    overflow-y: auto;
    left: 0;
    right: 0;
    padding: 1em;
    display: none;
    border-color:#007bff;
    border-bottom-right-radius: 50%;
    box-shadow:0 .313rem .719rem rgba(0,123,255,.1),0 .156rem .125rem rgba(0,0,0,.06);
`

const StyledP = styled.p`
    margin: 0.5em;
    
    &:hover {
        color: #007bff;
        .pIcon {
            display: unset;
        }
    }
`

const StyledHiddenIcon = styled.span`
    display: none;
`

const ContentSourceSection = () => {
    const theme = React.useContext(ThemePalletteContext)
    const handleCheckBoxChange = (event, name) => {
        const isChecked = checkedItems[name];
        const checkedResult = !isChecked
        setCheckedItems({ ...checkedItems, [name]: checkedResult });

        if (!checkedResult) {
            removeProvider({ variables: { provider: name } })
        }
    };

    const [searchPhrase, setSearchPhrase] = React.useState("");

    const { data, loading, error, refetch } = useQuery(GET_USER_PROVIDERS);
    const {
        data: allProviderData,
        loading: allProviderLoading,
        error: allProviderError
    } = useQuery(GET_ALL_PROVIDERS,
        {
            variables: {
                str: searchPhrase
            },
            skip: !searchPhrase
        }
    );
    const [addProvider, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_PROVIDER, {
        onCompleted: (data) => {
            if (data.addProvider) {
                toast("Added provider successfully", {
                    type: toast.TYPE.SUCCESS
                })
                setInsertUrlText("")
                refetch()
            }
        }
    });

    const [removeProvider, { loading: removeMutationLoading, error: removeMutationError }] = useMutation(REMOVE_PROVIDER, {
        onCompleted: (data) => {
            if (data.removeProvider) {
                toast("Removed provider successfully", {
                    type: toast.TYPE.SUCCESS
                })

            } else {
                toast("Something went wrong when removing provider", {
                    type: toast.TYPE.WARNING
                })
            }
            refetch()
        }
    });

    const handleUrlChange = (ev) => setInsertUrlText(ev.target.value)
    const handleSearchPhraseChange = (ev) => setSearchPhrase(ev.target.value)
    const handleAddClick = (ev) => {
        if (!isValidUrl(insertUrlText)) {
            toast("Please insert a valid URL", {
                type: toast.TYPE.ERROR
            })
            return
        }

        addProvider({
            variables: {
                sourceLink: insertUrlText
            }
        })
    }
    const handleAddProviderClick = () => setIsInsertUrlShowing(true)
    const handleGoToSearchClick = () => setIsInsertUrlShowing(false)
    const handleProviderClicked = (provider) => addProvider({
        variables: {
            provider: provider.provider,
            sourceLink: provider.source,
        }
    })

    const [checkedItems, setCheckedItems] = React.useState({});
    const userContentSources = data ? data.getProvidersForUser : []
    userContentSources.forEach((e) =>
        (typeof checkedItems[e.provider] === "undefined") &&
        (checkedItems[e.provider] = true))
    const [insertUrlText, setInsertUrlText] = React.useState("");
    const [isInsertUrlShowing, setIsInsertUrlShowing] = React.useState(false);

    const allProviders = allProviderData ? allProviderData.getProviders : []
    return (
        <div>
            <Margin vertical="1rem">
                <ThemedCard>
                    <CardBody>
                        <Margin bottom="1rem">
                            {loading && <p>Loading Providers...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {mutationLoading && <p>Adding provider...</p>}
                            {mutationError && <p>Error adding provider: {mutationError.message}</p>}
                            {removeMutationLoading && <p>Removing provider...</p>}
                            {removeMutationError && <p>Error removing provider: {mutationError.message}</p>}
                            <div>
                                <Margin vertical="0.5em">

                                    {
                                        !isInsertUrlShowing &&
                                        <StyledRelativeDiv>
                                            <FormInput value={searchPhrase} onChange={handleSearchPhraseChange} size="sm" placeholder="Search for a provider..." />
                                            <StyledFloatingDiv className="floatingDiv" style={{ backgroundColor: theme.color_background }}>
                                                <StyledDisplayCenterFlexDiv>
                                                    {
                                                        allProviderLoading && <p>Loading...</p>
                                                    }
                                                    {
                                                        allProviderError && <p>Error: {allProviderError.message}</p>
                                                    }
                                                </StyledDisplayCenterFlexDiv>
                                                {
                                                    allProviders.map(e =>
                                                        <StyledP onClick={handleProviderClicked.bind(this, e)}>
                                                            <StyledDisplayAlignCenterFlexDiv>
                                                                <StyledHiddenIcon className="pIcon"><AddIcon /></StyledHiddenIcon>{e.provider}
                                                            </StyledDisplayAlignCenterFlexDiv>
                                                        </StyledP>)
                                                }
                                                <StyledDisplayCenterFlexDiv>
                                                    {
                                                        searchPhrase ?
                                                            <span>Can't find a provider? <AnchorButton onClick={handleAddProviderClick}> Add provider </AnchorButton></span>
                                                            :
                                                            <span>Type above to search</span>
                                                    }
                                                </StyledDisplayCenterFlexDiv>
                                            </StyledFloatingDiv>
                                        </StyledRelativeDiv>
                                    }

                                    {
                                        isInsertUrlShowing && <div>
                                            <StyledDisplayCenterFlexDiv>
                                                <AnchorButton onClick={handleGoToSearchClick}> Back to Search </AnchorButton>
                                            </StyledDisplayCenterFlexDiv>
                                            <StyledDisplayFlexDiv>
                                                <FormInput value={insertUrlText} onChange={handleUrlChange} size="sm" placeholder="Insert URL" />
                                                <StyledMarginButtonCustom
                                                    onClick={handleAddClick}
                                                    borderColor={theme.color_background}
                                                    backgroundColor={theme.color_background}
                                                    color={theme.color_text}>
                                                    <AddIcon />
                                                </StyledMarginButtonCustom>
                                            </StyledDisplayFlexDiv>
                                        </div>
                                    }
                                    <ThemedCardTitle>Content sources</ThemedCardTitle>
                                    <div>
                                        {userContentSources.length === 0 ?
                                            <StyledDisplayCenterFlexDiv><p>Nothing found</p></StyledDisplayCenterFlexDiv>
                                            :
                                            userContentSources.map(e => (<FormCheckbox inline key={e.provider} checked={checkedItems[e.provider]} onChange={ev => handleCheckBoxChange(ev, e.provider)}>
                                                {e.source}
                                            </FormCheckbox>))}
                                    </div>
                                </Margin>
                            </div>
                        </Margin>
                    </CardBody>
                </ThemedCard>

            </Margin>
        </div>
    );
};

export default ContentSourceSection