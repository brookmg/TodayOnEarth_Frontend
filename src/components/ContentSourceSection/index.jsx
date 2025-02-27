/**
 * This component lets users modify their interests
 * 
 * Note: User needs to be logged in for this page to work as intended
 */
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Margin from "../CompoundComponents/Margin";
import ThemedCard from "../ThemedCard";
import ThemedCardTitle from "../ThemedCardTitle";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import AnchorButton from "../AnchorButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CardBody, FormCheckbox, FormInput } from "shards-react";
import { toast } from "react-toastify";
import { isLoggedIn } from "../../services/auth";
import { StyledRelativeDiv, StyledFloatingDiv, StyledDisplayCenterFlexDiv, StyledP, StyledDisplayAlignCenterFlexDiv, StyledHiddenIcon, StyledDisplayFlexDiv, StyledFlex1Div, StyledSelect, StyledMarginButtonCustom } from "./styles";
import { GET_USER_PROVIDERS, GET_ALL_PROVIDERS, ADD_PROVIDER, REMOVE_PROVIDER } from "./queries";


/* This is a list of providers the server can process */
const AVAILABLE_SOURCES = [`Facebook`, `Instagram`, `Telegram`, `Twitter`]

const ContentSourceSection = () => {
    const theme = React.useContext(ThemePalletteContext)
    const handleCheckBoxChange = (event, provider) => {
        const providerName = provider.provider
        const providerSource = provider.source

        const isChecked = checkedItems[providerName];
        const checkedResult = !isChecked
        setCheckedItems({ ...checkedItems, [providerName]: checkedResult });

        if (!checkedResult) {
            removeProvider({ variables: { provider: providerName, source: providerSource.toLowerCase() } })
        }
    };

    const [searchPhrase, setSearchPhrase] = React.useState(``);

    const { data, loading, error, refetch } = useQuery(GET_USER_PROVIDERS);
    const {
        data: allProviderData,
        loading: allProviderLoading,
        error: allProviderError
    } = useQuery(GET_ALL_PROVIDERS,
        {
            variables: {
                str: searchPhrase.toLowerCase()
            },
            skip: !searchPhrase
        }
    );
    const [addProvider, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_PROVIDER, {
        onCompleted: (data) => {
            if (data.addProvider) {
                toast(`Added provider successfully`, {
                    type: toast.TYPE.SUCCESS,
                    delay: 1000
                })
                setInsertProviderText(``)
                setInsertSourceText(``)
                refetch()
            }
        }
    });

    const [removeProvider, { loading: removeMutationLoading, error: removeMutationError }] = useMutation(REMOVE_PROVIDER, {
        onCompleted: (data) => {
            if (data.removeProvider) {
                toast(`Removed provider successfully`, {
                    type: toast.TYPE.SUCCESS
                })

            } else {
                toast(`Something went wrong when removing provider`, {
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
        if (insertSourceText === `` || insertProviderText === ``) {
            toast(`Can not insert, check if values are valid`, {
                type: toast.TYPE.ERROR
            })
            return
        }

        addProvider({
            variables: {
                source: insertSourceText.toLowerCase(),
                provider: insertProviderText,
            }
        })
    }
    const handleAddProviderClick = () => setIsInsertUrlShowing(true)
    const handleGoToSearchClick = () => setIsInsertUrlShowing(false)
    const handleProviderMouseDown = (provider) => addProvider({
        variables: {
            provider: provider.provider,
            source: provider.source.toLowerCase(),
        }
    })

    const [checkedItems, setCheckedItems] = React.useState({});
    const userContentSources = data ? data.getProvidersForUser : []
    userContentSources.forEach((e) =>
        (typeof checkedItems[e.provider] === `undefined`) &&
        (checkedItems[e.provider] = true))
    const [insertSourceText, setInsertSourceText] = React.useState(AVAILABLE_SOURCES[0]);
    const [insertProviderText, setInsertProviderText] = React.useState(``);
    const [isInsertUrlShowing, setIsInsertUrlShowing] = React.useState(false);

    const allProviders = allProviderData ? allProviderData.getProviders : []

    if (!isLoggedIn()) return null
    return (
        <div>
            <Margin vertical={`1rem`}>
                <ThemedCard>
                    <CardBody>
                        <Margin bottom={`1rem`}>
                            {loading && <p>Loading Providers...</p>}
                            {error && <p>Error: {error.message}</p>}
                            {mutationLoading && <p>Adding provider...</p>}
                            {mutationError && <p>Error adding provider: {mutationError.message}</p>}
                            {removeMutationLoading && <p>Removing provider...</p>}
                            {removeMutationError && <p>Error removing provider: {removeMutationError.message}</p>}
                            <div>
                                <Margin vertical={`0.5em`}>

                                    {
                                        !isInsertUrlShowing &&
                                        <StyledRelativeDiv>
                                            <FormInput value={searchPhrase} onChange={handleSearchPhraseChange} size={`sm`} placeholder={`Search for a provider...`} />
                                            <StyledFloatingDiv className={`floatingDiv`} style={{ backgroundColor: theme.color_background }}>
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
                                                                <StyledHiddenIcon className={`pIcon`}><AddIcon /></StyledHiddenIcon>
                                                                <div>
                                                                    <div>{e.provider}</div>
                                                                    <div style={{ color: theme.color_text_faded }}>{`${e.source[0].toUpperCase()}${e.source.substring(1)}`}</div>
                                                                </div>
                                                            </StyledDisplayAlignCenterFlexDiv>
                                                        </StyledP>)
                                                }
                                                <StyledDisplayCenterFlexDiv>
                                                    <span>Can`t find a provider? <AnchorButton onClick={handleAddProviderClick}> Add provider </AnchorButton></span>
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
                                                        <Margin horizontal={`0.25em`}>
                                                            <StyledSelect onChange={handleSourceChange}>
                                                                {
                                                                    AVAILABLE_SOURCES.map((source) => {
                                                                        return (<option key={source}>{source}</option>);
                                                                    })
                                                                }
                                                            </StyledSelect>
                                                            <FormInput value={insertProviderText} onChange={handleProviderChange} size={`sm`} placeholder={`Insert Provider`} />
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
                                                    <div style={{ color: theme.color_text_faded }}>{`${e.source[0].toUpperCase()}${e.source.substring(1)}`}</div>
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