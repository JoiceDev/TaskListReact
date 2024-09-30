import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as S from './styles'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa'
import { BotaoSalvar } from '../../containers/Formulario/styles'
import * as enums from '../../utils/enums/Tarefa'
import { Botao } from '../../styles'

type Props = TarefaClass

const Tarefa = ({
  titulo,
  descricao: descricaoOriginal,
  status,
  prioridade,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [EmEdicao, setEmEdicao] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEmEdicao(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {EmEdicao && <em>Editando... </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Descricao
        disabled={!EmEdicao}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {EmEdicao ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    status,
                    prioridade,
                    id,
                    titulo
                  })
                )
                setEmEdicao(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotoesCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotoesCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEmEdicao(true)}>Editar</Botao>
            <S.BotoesCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotoesCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}
export default Tarefa
