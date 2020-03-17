import React from "react";
import styled from "styled-components";
import gql from 'graphql-tag';
import AddIcon from '@material-ui/icons/Add';
import Margin from "./CompoundComponents/Margin";
import ThemedCard from "./UIElements/ThemedCard";
import ThemedCardTitle from "./UIElements/ThemedCardTitle";
import ButtonCustom from "./UIElements/ButtonCustom";
import ThemePalletteContext from "./Contexts/ThemePalletteContext";
import AnchorButton from "./UIElements/AnchorButton";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CardBody, FormCheckbox, FormInput, FormSelect } from "shards-react";
import { toast } from "react-toastify";
import { isLoggedIn } from "../services/auth";


const GET_USER_PROVIDERS = gql`

{
  getProvidersForUser{
    provider
    source
  }
}
`

const ADD_PROVIDER = gql`

mutation addProvider($source: String!,$provider: String!){
  addProvider(provider: { provider: $provider, source: $source, frequency: "" }) {
    provider
  }
}
`

const REMOVE_PROVIDER = gql`

mutation removeProvider($provider: String!, $source: String!){
  removeProvider(provider:{
    provider:$provider,
    source:$source,
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

const StyledFlex1Div = styled.div`
    flex: 1;
`

const StyledSelect = styled(FormSelect)`
    width: auto;
`

const AVAILABLE_SOURCES = ['Facebook', 'Instagram', 'Telegram', 'Twitter']

const ContentSourceSection = () => {
    const theme = React.useContext(ThemePalletteContext)
    const handleCheckBoxChange = (event, provider) => {
        const providerName = provider.provider
        const providerSource = provider.source

        const isChecked = checkedItems[providerName];
        const checkedResult = !isChecked
        setCheckedItems({ ...checkedItems, [providerName]: checkedResult });

        if (!checkedResult) {
            removeProvider({ variables: { provider: providerName, source: providerSource } })
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
                    type: toast.TYPE.SUCCESS,
                    delay: 1000
                })
                setInsertProviderText("")
                setInsertSourceText("")
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

    const handleSourceChange = (ev) => setInsertSourceText(ev.target.value)
    const handleProviderChange = (ev) => setInsertProviderText(ev.target.value)

    const handleSearchPhraseChange = (ev) => setSearchPhrase(ev.target.value)
    const handleAddClick = (ev) => {
        if (insertSourceText === "" || insertProviderText === "") {
            toast("Can not insert, check if values are valid", {
                type: toast.TYPE.ERROR
            })
            return
        }

        addProvider({
            variables: {
                source: insertSourceText,
                provider: insertProviderText,
            }
        })
    }
    const handleAddProviderClick = () => setIsInsertUrlShowing(true)
    const handleGoToSearchClick = () => setIsInsertUrlShowing(false)
    const handleProviderMouseDown = (provider) => addProvider({
        variables: {
            provider: provider.provider,
            source: provider.source,
        }
    })

    const [checkedItems, setCheckedItems] = React.useState({});
    const userContentSources = data ? data.getProvidersForUser : []
    userContentSources.forEach((e) =>
        (typeof checkedItems[e.provider] === "undefined") &&
        (checkedItems[e.provider] = true))
    const [insertSourceText, setInsertSourceText] = React.useState(AVAILABLE_SOURCES[0]);
    const [insertProviderText, setInsertProviderText] = React.useState("");
    const [isInsertUrlShowing, setIsInsertUrlShowing] = React.useState(false);

    const allProviders = allProviderData ? allProviderData.getProviders : []

    if (!isLoggedIn()) return null
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
                            {removeMutationError && <p>Error removing provider: {removeMutationError.message}</p>}
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
                                                        <StyledP onMouseDown={handleProviderMouseDown.bind(this, e)}>
                                                            <StyledDisplayAlignCenterFlexDiv>
                                                                <StyledHiddenIcon className="pIcon"><AddIcon /></StyledHiddenIcon>
                                                                <div>
                                                                    <div>{e.provider}</div>
                                                                    <div style={{ color: theme.color_text_faded }}>{e.source}</div>
                                                                </div>
                                                            </StyledDisplayAlignCenterFlexDiv>
                                                        </StyledP>)
                                                }
                                                <StyledDisplayCenterFlexDiv>
                                                    <span>Can't find a provider? <AnchorButton onClick={handleAddProviderClick}> Add provider </AnchorButton></span>
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
                                                <StyledFlex1Div>
                                                    <StyledDisplayAlignCenterFlexDiv>
                                                        <Margin horizontal="0.25em">
                                                            <StyledSelect onChange={handleSourceChange}>
                                                                {
                                                                    AVAILABLE_SOURCES.map((source) => {
                                                                        return (<option key={source}>{source}</option>);
                                                                    })
                                                                }
                                                            </StyledSelect>
                                                            <FormInput value={insertProviderText} onChange={handleProviderChange} size="sm" placeholder="Insert Provider" />
                                                        </Margin>
                                                    </StyledDisplayAlignCenterFlexDiv>
                                                </StyledFlex1Div>
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
                                            userContentSources.map(e => (<FormCheckbox inline key={e.provider} checked={checkedItems[e.provider]} onChange={ev => handleCheckBoxChange(ev, e)}>
                                                <div>
                                                    <div>{e.provider}</div>
                                                    <div style={{ color: theme.color_text_faded }}>{e.source}</div>
                                                </div>
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