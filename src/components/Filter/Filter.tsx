import style from './Filter.module.css';

interface Props {
  filter: string;
  handleFilter(evt: React.ChangeEvent<HTMLInputElement>): void;
}

const Filter = ({ filter, handleFilter }: Props) => {
  return (
    <div className={style.filter}>
      <p className={style.title}>Find contacts by name</p>
      <input className={style.input} type="text" onChange={handleFilter} value={filter} />
    </div>
  );
};

export default Filter;
