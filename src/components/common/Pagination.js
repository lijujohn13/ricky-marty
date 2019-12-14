import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import {
    Grid,
    InputLabel,
    Typography,
} from '@material-ui/core/';
import { getPrimaryColor } from '../../utils';

class Pagination extends Component {
    constructor(args) {
        super(args);
        const { currentPage } = this.props;
        this.state = {
            currentPage: currentPage || 1
        };
        this.rowsPerPage = 25;
        this.handleChangePage = this.handleChangePage.bind(this);
        this.renderNavigationBtn = this.renderNavigationBtn.bind(this);
    }

    getPageNumbers() {
        const { currentPage } = this.state;
        const { count } = this.props;
        const totalPage = Math.ceil(count / this.rowsPerPage);
        const pageNumbers = [];

        if (totalPage === 0) {
            return [1];
        }

        if (currentPage === 1 && currentPage === totalPage) {
            pageNumbers.push(currentPage);
        } else if (currentPage === totalPage) {
            let tempPage = currentPage;
            let pageLimit = 3;
            while (tempPage >= 1 && pageLimit > 0) {
                pageNumbers.push(tempPage);
                tempPage--;
                pageLimit--;
            }
        } else {
            pageNumbers.push(currentPage);
            if (currentPage > 1) {
                pageNumbers.push(currentPage - 1);
                if (currentPage + 1 <= totalPage) {
                    pageNumbers.push(currentPage + 1);
                }
            } else {
                pageNumbers.push(currentPage + 1);
                if (currentPage + 2 <= totalPage) {
                    pageNumbers.push(currentPage + 2);
                }
            }
        }


        return pageNumbers.sort((a, b) => a - b);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(newProps) {
        const { currentPage } = this.props;

        if (currentPage !== newProps.currentPage) {
            this.setState({
                currentPage: newProps.currentPage
            });
        }
    }

    handleChangePage(evt, action) {
        const { onChange, count } = this.props;
        const { currentPage } = this.state;
        let newPage = 1;
        const totalPage = Math.ceil(count / this.rowsPerPage);

        switch (action) {
        case 'prev':
            newPage = currentPage - 1;
            break;

        case 'next':
            newPage = currentPage + 1;
            break;

        case 'last':
            newPage = totalPage;
            break;

        default:
            break;
        }

        this.setState({
            currentPage: newPage
        }, () => onChange(newPage));
    }

    goToPage(e, page) {
        const { onChange } = this.props;
        this.setState({
            currentPage: page
        }, () => {
            const { currentPage } = this.state;
            onChange(currentPage);
        });
    }

    renderNavigationBtn(label, disabled) {
        return (
            <Grid item xs={2} className="w3-center">
                <InputLabel
                    onClick={e => (disabled ? false : this.handleChangePage(e, label.toLowerCase()))}
                    className={!disabled ? 'r8y-cursor' : 'r8y-non-clickable'}
                    style={{ color: !disabled ? getPrimaryColor(this.props) : '' }}
                >
                    {label}
                </InputLabel>
            </Grid>
        );
    }

    render() {
        const { count } = this.props;
        const totalCount = count || 0;
        if (!totalCount) {
            return null;
        }
        const { currentPage } = this.state;
        const totalPage = Math.ceil(totalCount / this.rowsPerPage);
        const pageNumbers = this.getPageNumbers();
        const firstBtnDisable = currentPage === 1;
        const prevBtnDisable = currentPage - 1 <= 1;
        const nextBtnDisable = currentPage + 1 >= totalPage;
        const lastBtnDisable = totalPage === 0 || currentPage === totalPage;

        return (
            <Grid container className="r8y-pagination w3-margin-top">
                <Grid item xs={6}>
                    <Typography variant="body1">
                        {`Total: ${totalCount}`}
                    </Typography>
                </Grid>
                <Grid item xs={6} className="r8y-auto-margin">
                    <Grid container spacing={2}>
                        {this.renderNavigationBtn('First', firstBtnDisable)}
                        {this.renderNavigationBtn('Prev', prevBtnDisable)}
                        <Grid item xs={4}>
                            <div className="r8y-page-no-container">
                                {pageNumbers.map(pageNo => (
                                    <span
                                        key={`page_${pageNo}`}
                                        onKeyDown={undefined}
                                        tabIndex={0}
                                        role="link"
                                        style={{ backgroundColor: currentPage === pageNo ? getPrimaryColor(this.props) : '', margin: 'auto' }}
                                        className={`r8y-cursor ${currentPage === pageNo ? 'r8y-current-page' : 'r8y-page-no'}`}
                                        onClick={e => this.goToPage(e, pageNo)}
                                    >
                                        {pageNo}
                                    </span>
                                ))}
                            </div>
                        </Grid>
                        {this.renderNavigationBtn('Next', nextBtnDisable)}
                        {this.renderNavigationBtn('Last', lastBtnDisable)}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}


export default withTheme(
    Pagination
);
