import { Link, NavLink, Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`

const Sidebar = styled.div`
    height: 100%;
    max-height: 100%;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 260px;
    background: #fff;
    box-shadow: 0 16px 38px -12px rgb(0 0 0 / 56%), 0 4px 25px 0 rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%);
`

const MainPanel = styled.div`
    width: calc(100% - 260px);
    margin-left: auto;
`

const LogoLink = styled(Link)`
    text-transform: uppercase;
    padding: 5px 0;
    display: inline-block;
    font-size: 18px;
    color: #3c4858;
    text-decoration: none;
    white-space: nowrap;
    font-weight: 400;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
    display: block;
    &::after{
        content: "";
        position: absolute;
        bottom: 0;
        right: 15px;
        height: 1px;
        width: calc(100% - 30px);
        background-color: hsla(0,0%,71%,.3);
    }
`


const Logo = styled.div`
    padding: 15px 0;
    margin: 0;
    display: block;
    position: relative;
    z-index: 4;
`

const SidebarWrapper = styled.div`
    position: relative;
    height: calc(100vh - 75px);
    overflow: auto;
    width: 260px;
    z-index: 4;
    padding-bottom: 30px;
    touch-action: auto;
    overflow: hidden!important;
`
const Nav = styled.ul`
    margin-top: 20px;
    display: block;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
`
const NavItem = styled.li`
    width: 100%;
     &:first-child{
        margin-top:0;
    }
`

const NavItemLink = styled(NavLink)`
    margin: 10px 15px 0;
    border-radius: 3px;
    color: #3c4858;
    text-transform: capitalize;
    font-size: 13px;
    padding: 10px 15px;
    display: block;
    &:hover{
        background-color: #68696913;
    }
    &.active{
        background-color: #00BCD4;
        box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(156 39 176 / 40%);
    }
    
   
`

const LinkText = styled.p`
    margin: 0;
    line-height: 30px;
    font-size: 14px;
    position: relative;
    display: block;
    height: auto;
    white-space: nowrap;
`
const handleActiveClassName = (props: any) => props.isActive ? 'active' : ''

const MainLayout = () => {
    return (
        <Wrapper>
            <Sidebar>
                <Logo>
                    <LogoLink to="/">Admin</LogoLink>
                </Logo>
                <SidebarWrapper>
                    <Nav>
                        <NavItem>
                            <NavItemLink className={handleActiveClassName} to="/dashboard" >
                                <LinkText>Dashboard</LinkText>
                            </NavItemLink>
                        </NavItem>

                        

                        <NavItem>
                            <NavItemLink className={handleActiveClassName} to="/my-videos">
                                <LinkText>Videos</LinkText>
                            </NavItemLink>
                        </NavItem>

                        {/* <NavItem>
                            <NavItemLink className={handleActiveClassName} to="/analysis">
                                <LinkText>Dashboard</LinkText>
                            </NavItemLink>
                        </NavItem> */}
                    </Nav>
                </SidebarWrapper>
            </Sidebar>
            <MainPanel>
                <Outlet />
            </MainPanel>
        </Wrapper>
    )
}

export default MainLayout