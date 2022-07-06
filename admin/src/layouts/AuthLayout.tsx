import React, { FC } from "react"
import styled from "styled-components"
interface Props {

}

const Wrapper = styled.div`
display: flex;
`

const AuthLayout: FC<Props> = () => {
    return (
        <Wrapper>
            Auth Layout
        </Wrapper>
    )
}

export default AuthLayout