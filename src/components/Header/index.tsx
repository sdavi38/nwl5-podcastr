import styles from './styles.module.scss';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function Header(){
    const currentDate = format(new Date(), 'EEEE, d / MMMM', {
        locale: ptBR
    })
    return (
        <header className={styles.headContainer}>
            <img src='/logo.svg' alt="Podcastr" />
            <p>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>

        </header>
    )
}