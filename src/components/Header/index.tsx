import Logo from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface IHeaderProps {
  onOpenNewTranslationModal: () => void;
}

export function Header({ onOpenNewTranslationModal }: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={Logo} alt="dtmoney" />

        {/* props vinda do component App -> Header */}
        <button onClick={onOpenNewTranslationModal} type="button">
          Nova transação
        </button>
      </Content>
    </Container>
  )
}