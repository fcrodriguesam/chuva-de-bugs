# Tarefas: Chuva de Bugs

## Tarefa 1: Preparar a estrutura base do jogo
- [x] Criar a página HTML e o CSS base com área centralizada e tema escuro de editor.
- [x] Organizar os módulos JavaScript (`main`, `config`, `input`, `game`, `render`, `storage`).
- [x] Definir o objeto `CONFIG` com os valores ajustáveis do jogo.

## Tarefa 2: Implementar o estado inicial e os fluxos de tela
- [x] Definir os estados `initial`, `playing` e `gameOver` no objeto principal do jogo.
- [x] Inicializar o dev, pontuação, vidas e recorde ao abrir a página.
- [x] Configurar a transição da tela inicial para a partida ao pressionar Espaço.

## Tarefa 3: Controlar o dev e os limites do mapa
- Capturar as teclas ←, →, A e D via listener do teclado.
- Atualizar a posição horizontal do dev com velocidade constante.
- Impedir que o dev saia da área de jogo.

## Tarefa 4: Gerar itens, colisões e remoção
- Criar a lógica de spawn de cafés e bugs em posições aleatórias no topo.
- Fazer os itens caírem com velocidade variável e crescente ao longo do tempo.
- Detectar colisões com o dev e remover os itens afetados.

## Tarefa 5: Implementar pontuação, vidas e dificuldade
- Aumentar a pontuação em 1 ao coletar café.
- Reduzir as vidas em 1 ao encostar em bug.
- Encerrar a partida quando todas as vidas forem consumidas.
- Aumentar a frequência e a velocidade de queda com o passar do tempo.

## Tarefa 6: Exibir HUD e telas visuais
- Desenhar o fundo, o dev, os itens e a área do jogo no canvas.
- Mostrar pontuação e vidas na parte superior da tela durante a partida.
- Exibir a tela de fim de jogo com pontuação final, recorde e instrução para reiniciar.

## Tarefa 7: Persistir o recorde no navegador
- Ler o valor do recorde em `localStorage` ao carregar a página.
- Atualizar o recorde quando a pontuação atual exceder o valor salvo.
- Reaproveitar o mesmo valor após recarregar ou fechar a página.

## Tarefa 8: Validar o comportamento completo do jogo
- Testar o fluxo de início, partida, colisões e fim de jogo.
- Confirmar que a dificuldade aumenta sem quebrar o movimento.
- Verificar se o recorde permanece salvo e se o reinício funciona corretamente.

## Dependências
- Tarefa 1 depende de nenhum passo anterior.
- Tarefa 2 depende da Tarefa 1.
- Tarefa 3 depende da Tarefa 2.
- Tarefa 4 depende da Tarefa 3.
- Tarefa 5 depende da Tarefa 4.
- Tarefa 6 depende da Tarefa 5.
- Tarefa 7 depende da Tarefa 6.
- Tarefa 8 depende de todas as tarefas anteriores.
