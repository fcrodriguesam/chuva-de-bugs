# Requisitos: Chuva de Bugs

## Introdução
Este projeto é um jogo de navegador em que o jogador controla um dev que coleta cafés e evita bugs que caem do céu. A proposta é entregar uma experiência simples, rápida e viciante, com foco em mecânica clara e partidas curtas.

## Glossário
- **Dev**: personagem controlado pelo jogador na parte inferior da tela.
- **Café**: item positivo que aumenta a pontuação quando coletado.
- **Bug**: item negativo que reduz as vidas quando encosta no dev.
- **Recorde**: maior pontuação salva no navegador para a sessão do jogador.

## Requisitos

### Requisito 1: Tela inicial e início da partida
**História de usuário:** Como jogador, quero ver uma tela inicial clara e começar com um comando simples, para iniciar a partida sem confusão.

**Critérios de aceitação**
- **1.1** QUANDO a página for aberta, O SISTEMA DEVE exibir uma tela inicial com o nome do jogo e a instrução "pressione Espaço para começar".
- **1.2** QUANDO o jogador pressionar a tecla Espaço na tela inicial, O SISTEMA DEVE iniciar a partida e trocar para a tela de jogo.
- **1.3** ENQUANTO a partida não começou, O SISTEMA DEVE manter a tela inicial visível e não processar pontuação, vidas ou itens.

### Requisito 2: Movimento do dev
**História de usuário:** Como jogador, quero mover o dev na horizontal, para desviar dos bugs e alcançar os cafés.

**Critérios de aceitação**
- **2.1** QUANDO o jogador pressionar as teclas ← ou A, O SISTEMA DEVE mover o dev para a esquerda.
- **2.2** QUANDO o jogador pressionar as teclas → ou D, O SISTEMA DEVE mover o dev para a direita.
- **2.3** ENQUANTO o jogador não pressionar nenhum comando lateral, O SISTEMA DEVE manter o dev parado na posição atual.
- **2.4** O SISTEMA DEVE limitar o movimento do dev ao espaço horizontal da área de jogo.

### Requisito 3: Geração e coleta de itens
**História de usuário:** Como jogador, quero que cafés e bugs caiam em posições aleatórias, para decidir onde me mover e acumular pontos ou evitar dano.

**Critérios de aceitação**
- **3.1** QUANDO a partida estiver em andamento, O SISTEMA DEVE gerar cafés e bugs em posições aleatórias no topo da área de jogo em intervalos regulares.
- **3.2** QUANDO um café alcançar a área do dev, O SISTEMA DEVE somar 1 ponto e remover o item da tela.
- **3.3** QUANDO um bug alcançar o dev, O SISTEMA DEVE remover o item e reduzir em 1 a quantidade de vidas do jogador.
- **3.4** QUANDO um item cair até o chão sem colidir com o dev, O SISTEMA DEVE removê-lo da tela sem alterar pontuação ou vidas.

### Requisito 4: Pontuação, vidas e dificuldade progressiva
**História de usuário:** Como jogador, quero acompanhar o progresso e sentir o jogo ficando mais desafiador, para manter a tensão e a motivação.

**Critérios de aceitação**
- **4.1** QUANDO a partida iniciar, O SISTEMA DEVE iniciar o jogador com 3 vidas e 0 pontos.
- **4.2** ENQUANTO a partida estiver ativa, O SISTEMA DEVE mostrar pontuação e vidas em uma área visível no topo da tela.
- **4.3** COM O PASSAR do tempo, O SISTEMA DEVE aumentar a velocidade e a frequência de queda dos itens.
- **4.4** SE o jogador perder todas as vidas, ENTÃO O SISTEMA DEVE encerrar a partida e exibir a tela de fim de jogo.

### Requisito 5: Fim de jogo, recorde e reinício
**História de usuário:** Como jogador, quero saber minha pontuação final e tentar superar o recorde, para continuar jogando e melhorar meu desempenho.

**Critérios de aceitação**
- **5.1** QUANDO a partida terminar, O SISTEMA DEVE mostrar a pontuação final, o recorde salvo e a instrução "pressione Espaço para jogar de novo".
- **5.2** QUANDO o jogador pressionar Espaço na tela de fim de jogo, O SISTEMA DEVE reiniciar a partida do início.
- **5.3** O SISTEMA DEVE salvar o recorde no navegador e manter esse valor mesmo após fechar ou recarregar a página.
- **5.4** QUANDO a pontuação atual ultrapassar o recorde, O SISTEMA DEVE atualizar o valor exibido e salvo como novo recorde.

## Fora do escopo
- Som, música e efeitos sonoros.
- Multiplayer e partidas online.
- Login, contas e ranking compartilhado.
- Níveis, fases e mecânicas avançadas.
- Qualquer recurso que dependa de servidor externo.

## Suposições
- A área de jogo terá tamanho fixo e ficará centralizada na página.
- O controle será apenas por teclado, com as setas e as teclas A/D.
- O recorde será armazenado no navegador usando armazenamento local do próprio cliente.
- O jogo será construído como uma experiência simples de uma tela, sem menus extras além de início, jogo e fim de jogo.
